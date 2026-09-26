const minutes = value => {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(String(value || ''));
  return match ? Number(match[1]) * 60 + Number(match[2]) : null;
};

export function tripInsights(trip) {
  const days = Array.isArray(trip?.days) ? trip.days : [];
  const nodes = days.flatMap(day => day.nodes || []);
  const planned = nodes.reduce((sum, node) => sum + (Number(node.cost) || 0), 0);
  const budget = Number(trip?.budget) || 0;
  const checklistLeft = (trip?.checklist || []).filter(item => !item.done).length;
  const bookingsToCheck = nodes.filter(node => node.type === '交通' || node.type === '住宿').length;
  const conflicts = [];
  days.forEach((day, index) => {
    const timed = (day.nodes || []).filter(node => node.type !== '住宿' && minutes(node.time) !== null)
      .map(node => ({node, start:minutes(node.time), duration:Number.parseInt(node.duration, 10) || 0}))
      .sort((a,b) => a.start - b.start);
    for (let i = 1; i < timed.length; i++) {
      const previous = timed[i-1], next = timed[i];
      if (previous.duration > 0 && previous.start + previous.duration > next.start) {
        conflicts.push({day:index+1, first:previous.node.name, second:next.node.name});
      }
    }
  });
  return {planned, budget, checklistLeft, bookingsToCheck, conflicts, located:nodes.filter(node => node.lat != null && node.lng != null).length};
}

const icsEscape = value => String(value ?? '').replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
const utcStamp = (date, time, offsetMinutes=0) => {
  const stamp = new Date(`${date}T${time}:00+08:00`);
  if (!Number.isFinite(stamp.getTime())) return null;
  return new Date(stamp.getTime()+offsetMinutes*60000).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
};
const addDate = (date, days) => {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate()+days);
  return d.toISOString().slice(0,10);
};
const foldLine = line => {
  const encoder = new TextEncoder();
  let result='',width=0;
  for(const character of line){const length=encoder.encode(character).length;if(width+length>73){result+='\r\n ';width=1;}result+=character;width+=length;}
  return result;
};

export function tripCalendar(trip) {
  const rows = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//XIANGYE//Trip Planner//ZH','CALSCALE:GREGORIAN','METHOD:PUBLISH','X-WR-CALNAME:'+icsEscape(trip.title)];
  const now = new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
  (trip.days || []).forEach((day, index) => {
    const date = addDate(trip.start,index);
    (day.nodes || []).forEach((node, position) => {
      if (minutes(node.time) === null) return;
      const duration = Math.max(30, Math.min(480, Number.parseInt(node.duration,10) || 60));
      const start = utcStamp(date,node.time), end = utcStamp(date,node.time,duration);
      if (!start || !end) return;
      rows.push('BEGIN:VEVENT',`UID:${icsEscape(trip.id)}-${index+1}-${position+1}@xiangye`,
        `DTSTAMP:${now}`,`DTSTART:${start}`,`DTEND:${end}`,
        `SUMMARY:${icsEscape(node.name)}`,
        `DESCRIPTION:${icsEscape(`第 ${index+1} 天 · ${node.note || ''}；实际开放、交通和费用请出发前核验。`)}`,
        ...(node.lat != null && node.lng != null ? [`GEO:${Number(node.lat)};${Number(node.lng)}`] : []),
        'END:VEVENT');
    });
  });
  rows.push('END:VCALENDAR');
  return rows.map(foldLine).join('\r\n')+'\r\n';
}
