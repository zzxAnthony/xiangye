import {placeCatalog, haversineKm} from './catalog.js';

const dateAfter=(start,n)=>{const d=new Date(`${start}T12:00:00`);d.setDate(d.getDate()+n);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
const normalized=s=>String(s||'').replace(/[\s·省市区县景区风景区]/g,'').toLowerCase();
const matches=(a,b)=>{const x=normalized(a),y=normalized(b);return x&&y&&(x.includes(y)||y.includes(x));};
const point=p=>({id:`node-${Date.now()}-${Math.random().toString(36).slice(2,9)}`,placeId:p.id||null,time:'',duration:`${p.duration||90} 分钟`,name:p.name,type:p.category||'地点',note:p.description||p.address||'地图地点；开放时间和票价需核验。',cost:0,costLabel:'费用待查询',status:'地图参考',lat:Number(p.lat),lng:Number(p.lng),coordinateSystem:'WGS84',source:p.source||'OpenStreetMap Nominatim',icon:p.category==='展馆'?'museum':p.category==='街区'?'landmark':'pin',transport:null});
const validPoint=p=>p&&Number.isFinite(Number(p.lat))&&Number.isFinite(Number(p.lng))&&Number(p.lat)!==0&&Number(p.lng)!==0;
const rank=(p,intent,profile)=>{
  const tags=p.tags||[];let score=0;
  for(const name of [...(intent.mustVisit||[]),...(intent.addPlaces||[])])if(matches(p.name,name))score+=100;
  for(const tag of [...(intent.themes||[]),...(profile.interests||[])])if(tags.some(t=>matches(t,tag)))score+=6;
  if(p.category==='交通')score-=100;
  return score;
};
const refreshDay=(day,i,start,city,preserveTimes=false)=>{day.label=`DAY ${String(i+1).padStart(2,'0')}`;day.date=dateAfter(start,i);day.title=day.nodes.filter(n=>n.lat!=null).slice(0,2).map(n=>n.name).join(' · ')||`${city} · 自由安排`;day.note=day.nodes.some(n=>n.lat!=null)?'地点和顺序可继续调整':'留白时间 · 可搜索真实地点加入';let visited=0;const arrival=day.nodes[0]?.type==='交通'&&day.nodes[0]?.lat==null;day.nodes.forEach((n,j)=>{n.day=i+1;if(preserveTimes&&n.time)return;if(n.type==='餐饮')n.time='12:30';else if(n.type==='住宿')n.time='19:00';else if(n.type==='交通'&&n.lat==null)n.time=j===0?'07:30':'14:00';else{const times=arrival?['15:00','17:00','18:00','19:00']:['09:30','14:30','16:30','18:00'];n.time=times[Math.min(visited++,3)];}});};
const meal=(city)=>({id:`meal-${Date.now()}-${Math.random()}`,name:`${city}午餐待选`,type:'餐饮',duration:'60 分钟',note:'按当天实际位置挑选；金额只是模拟预算。',cost:80,costLabel:'餐饮预留 ¥80（模拟）',status:'模拟估算',lat:null,lng:null,icon:'coffee'});
const stay=(city)=>({id:`stay-${Date.now()}-${Math.random()}`,name:`${city}住宿待选`,type:'住宿',duration:'过夜',note:'按日期和真实房态选择；金额只是模拟预算。',cost:360,costLabel:'住宿预留 ¥360（模拟）',status:'模拟估算',lat:null,lng:null,icon:'bed'});
const travel=(name,note)=>({id:`travel-${Date.now()}-${Math.random()}`,name,type:'交通',duration:'以实际交通为准',note,cost:0,costLabel:'交通费用待查询',status:'待查询',lat:null,lng:null,icon:'route'});

export function buildNaturalDraft({intent,mode,current,profile,candidates,startFallback,minimumDate,manualPlaces=[]}){
  const city=String(intent.destination||current?.destination||'').trim();
  if(!city)throw new Error('还没有识别到目的地。请在描述中写明想去的城市。');
  if(mode==='create'){
    const days=Math.max(1,Math.min(14,Number(intent.days)||3));
    if(intent.startDate && intent.startDate<(minimumDate||startFallback))throw new Error('出发日期已经过去，请修改日期后再生成行程。');
    const start=/^\d{4}-\d{2}-\d{2}$/.test(intent.startDate||'')&&intent.startDate>=(minimumDate||startFallback)?intent.startDate:startFallback;
    const pace=intent.pace||profile.pace||'刚刚好';
    const daily=pace==='慢一点'?2:pace==='多走走'?4:3;
    const rankedIntent={...intent,mustVisit:(intent.mustVisit||[]).filter(x=>normalized(x)!==normalized(city)),addPlaces:(intent.addPlaces||[]).filter(x=>normalized(x)!==normalized(city))};
    const pool=candidates.filter(validPoint).filter(p=>p.category!=='交通').sort((a,b)=>rank(b,rankedIntent,profile)-rank(a,rankedIntent,profile));
    const unique=pool.filter((p,i)=>pool.findIndex(x=>normalized(x.name)===normalized(p.name))===i);
    if(!unique.length)throw new Error(`没有找到${city}的可定位地点，请换一种城市或地点名称。`);
    const picked=manualPlaces.filter(x=>validPoint(x.place));
    if(picked.some(x=>Number(x.day)>days))throw new Error(`手动地点指定了超过第 ${days} 天的日期，请调整地点所属天数。`);
    const assigned=Array.from({length:days},()=>[]),used=new Set();
    const add=(p,i)=>{if(i<0||i>=days||used.has(normalized(p.name)))return false;assigned[i].push(p);used.add(normalized(p.name));return true;};
    for(const entry of picked){const p=entry.place;const chosenDay=Number(entry.day);const preferred=chosenDay>=1&&chosenDay<=days?chosenDay-1:days===4&&p.routeDay?Number(p.routeDay)-1:assigned.findIndex(a=>a.length===Math.min(...assigned.map(b=>b.length)));add(p,preferred);}
    const travelHeavy=!!(intent.origin||profile.departureCity)&&!matches(intent.origin||profile.departureCity,city)&&days>1;
    const capacity=i=>travelHeavy&&(i===0||i===days-1)?1:daily;
    if(days===4&&unique.some(p=>p.routeDay)){
      for(let i=0;i<days;i++)for(const p of unique.filter(p=>p.routeDay===i+1))if(assigned[i].length<capacity(i))add(p,i);
    }
    // Give every day a real stop before adding a second stop to any day.
    for(let i=0;i<days;i++)if(!assigned[i].length){const p=unique.find(p=>!used.has(normalized(p.name)));if(p)add(p,i);}
    for(const p of unique){if(used.has(normalized(p.name)))continue;const options=assigned.map((list,i)=>({i,space:capacity(i)-list.length})).filter(x=>x.space>0);if(!options.length)break;const chosen=p.routeDay&&days===4&&options.some(x=>x.i===p.routeDay-1)?p.routeDay-1:options.sort((a,b)=>assigned[a.i].length-assigned[b.i].length||a.i-b.i)[0].i;add(p,chosen);}
    const sparse=assigned.map((list,i)=>list.length?null:i+1).filter(Boolean);
    if(sparse.length)throw new Error(`只找到 ${days-sparse.length} 天可用的真实地点，尚不能可靠规划 ${days} 天。请手动添加地点或缩短天数。`);
    const daysList=assigned.map((places,i)=>{const nodes=places.map(point);if(travelHeavy&&i===0)nodes.unshift(travel(`从${intent.origin||profile.departureCity}出发 · 前往${city}`,'长途交通方式、道路与抵达时间待核对；当天只安排少量游览。'));nodes.splice(1,0,meal(city));if(i<days-1)nodes.push(stay(city));if(travelHeavy&&i===days-1)nodes.push(travel(`从${city}返回${intent.origin||profile.departureCity}`,'请预留充足的返程时间，班次、道路和费用待核对。'));const day={nodes};refreshDay(day,i,start,city);return day;});
    const missing=rankedIntent.mustVisit.filter(name=>!unique.some(p=>matches(p.name,name))&&!picked.some(x=>matches(x.place.name,name)));
    const trip={id:`trip-${Date.now()}`,title:`${city} · ${days} 天 ${Math.max(0,days-1)} 晚`,destination:city,origin:intent.origin||profile.departureCity||'',start,end:dateAfter(start,days-1),party:intent.party||1,budget:intent.budget||Math.max(500,days*500*(intent.party||1)),pace,version:1,demo:false,days:daysList,expenses:[],checklist:[],updated:Date.now()};
    const notice=[!intent.startDate?'出发日期为建议值，请确认。':'',!intent.budget?'预算为建议值，请确认。':'',missing.length?`未匹配到：${missing.join('、')}，请在上方手动搜索添加。`:'',travelHeavy?'长途交通时间和方式尚未核验，请出发前确认。':''].filter(Boolean).join(' ');
    return {trip,notice,summary:intent.summary||`前往${city}的${days}天行程`,mode};
  }
  if(!current)throw new Error('请先选择要调整的行程。');
  if(intent.destination&&intent.destination!==current.destination)throw new Error('跨城市调整请新建行程，以免原有地点和路线混在一起。');
  const trip=structuredClone(current),changes=[];
  const target=Number(intent.targetDay)||0;
  const scope=target?[trip.days[target-1]].filter(Boolean):trip.days;
  if(target&&!scope.length)throw new Error(`当前行程没有第 ${target} 天。`);
  const before=trip.days.map(d=>d.nodes.map(n=>n.name));
  if(intent.origin)trip.origin=intent.origin;
  if(intent.party)trip.party=intent.party;
  if(intent.budget)trip.budget=intent.budget;
  if(intent.pace)trip.pace=intent.pace;
  if(/^\d{4}-\d{2}-\d{2}$/.test(intent.startDate||'')&&intent.startDate>=startFallback)trip.start=intent.startDate;
  if(intent.days&&intent.days!==trip.days.length){
    if(intent.days<trip.days.length&&trip.days.slice(intent.days).some(d=>d.nodes.some(n=>n.locked)))throw new Error('要删除的日期包含锁定地点，请先解锁。');
    trip.days=trip.days.slice(0,intent.days);
    while(trip.days.length<intent.days)trip.days.push({nodes:[meal(city),stay(city)]});
    changes.push(`旅行天数改为 ${intent.days} 天`);
  }
  const removed=[];
  for(const name of intent.removePlaces||[]){for(const day of scope){for(let i=day.nodes.length-1;i>=0;i--){const n=day.nodes[i];if(matches(n.name,name)&&!n.locked){removed.push({day,index:i,name:n.name});day.nodes.splice(i,1);}}}}
  if((intent.removePlaces||[]).length&&!removed.length)throw new Error('没有找到要移除的地点，或该地点已锁定。请写出行程里的准确名称。');
  const adds=[...(intent.addPlaces||[])];
  if(!adds.length&&(intent.mustVisit||[]).length)adds.push(...intent.mustVisit);
  for(const entry of manualPlaces.filter(x=>validPoint(x.place))){const p=entry.place;const chosen=Number(entry.day);if(chosen>trip.days.length)throw new Error(`手动地点“${p.name}”指定的日期超过行程天数。`);const day=chosen>=1?trip.days[chosen-1]:scope[0]||trip.days[0];if(day&&!day.nodes.some(n=>matches(n.name,p.name))){const stayIndex=day.nodes.findIndex(n=>n.type==='住宿');day.nodes.splice(stayIndex<0?day.nodes.length:stayIndex,0,point(p));changes.push(`加入 ${p.name}`);}}
  for(const name of adds){const p=candidates.filter(validPoint).find(x=>matches(x.name,name));if(!p)throw new Error(`没有查到“${name}”的真实坐标，请换用更准确的地点名称。`);const day=target?trip.days[target-1]:(removed[0]?.day||trip.days.reduce((a,b)=>a.nodes.length<=b.nodes.length?a:b));if(day.nodes.some(n=>matches(n.name,p.name)))continue;const node=point(p);const replacement=removed.find(r=>r.day===day);const stayIndex=day.nodes.findIndex(n=>n.type==='住宿');day.nodes.splice(replacement?Math.min(replacement.index,day.nodes.length):stayIndex<0?day.nodes.length:stayIndex,0,node);changes.push(`加入 ${p.name}`);}
  if(intent.action==='relax'&&!removed.length){for(const day of scope){const idx=day.nodes.findLastIndex(n=>n.lat!=null&&!n.locked);if(idx>=0){changes.push(`减少 ${day.nodes[idx].name}`);day.nodes.splice(idx,1);}}}
  if(intent.action==='reorder'){for(const day of scope){const movable=day.nodes.filter(n=>validPoint(n)&&!n.locked);if(movable.length<2)continue;const ordered=[movable.shift()];while(movable.length){let best=0;for(let i=1;i<movable.length;i++)if(haversineKm(ordered.at(-1),movable[i])<haversineKm(ordered.at(-1),movable[best]))best=i;ordered.push(movable.splice(best,1)[0]);}let i=0;day.nodes=day.nodes.map(n=>validPoint(n)&&!n.locked?ordered[i++]:n);}changes.push('按地点距离调整顺序');}
  if(intent.origin||intent.party||intent.budget||intent.pace||intent.startDate)changes.push('更新旅程设置');
  if(intent.days)changes.push('更新旅行天数');
  if(!changes.length&&!removed.length)throw new Error('没有识别到具体调整。请说明要增加、移除或调整的地点、日期或预算。');
  trip.end=dateAfter(trip.start,trip.days.length-1);trip.title=`${city} · ${trip.days.length} 天 ${Math.max(0,trip.days.length-1)} 晚`;
  trip.days.forEach((day,i)=>refreshDay(day,i,trip.start,city,true));
  const diff=trip.days.map((d,i)=>({day:i+1,added:d.nodes.map(n=>n.name).filter(n=>!before[i]?.includes(n)),removed:(before[i]||[]).filter(n=>!d.nodes.some(x=>x.name===n))})).filter(x=>x.added.length||x.removed.length);
  trip.version=(current.version||1)+1;trip.updated=Date.now();
  return {trip,notice:'调整尚未保存。请核对地点、日期与路线，确认后才会覆盖当前行程。',summary:intent.summary||changes.join('；'),diff,mode};
}
