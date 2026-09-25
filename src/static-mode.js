import {placeCatalog} from './catalog.js';

export const staticMode = location.hostname.endsWith('.github.io') || new URLSearchParams(location.search).has('static');

const chineseNumber = value => ({一:1,二:2,两:2,三:3,四:4,五:5,六:6,七:7,八:8,九:9,十:10}[value] || Number(value));
const cities = [...new Set(placeCatalog.map(place => place.city))];

export function searchStaticPlaces(query, city='') {
  const needle = String(query || '').trim().replace(/(景点|旅游景区|公园|附近|的)/g, '');
  if (!needle) return [];
  const pool = placeCatalog.filter(place => !city || city === '全国' || place.city === city);
  return pool.filter(place => `${place.name} ${place.city} ${place.category} ${(place.tags || []).join(' ')}`.includes(needle) || needle.includes(place.name)).slice(0, 20);
}

export function interpretStaticPlan(text, mode, current) {
  const input = String(text || '').trim();
  const mentionedCities = cities.filter(city => input.includes(city));
  const destination = mentionedCities.find(city => city !== current?.origin) || current?.destination || '';
  const origin = input.match(/(?:从|由)([^，。\s]{2,12}?)(?:出发|到|去|前往)/)?.[1] || '';
  const days = chineseNumber(input.match(/([一二两三四五六七八九十\d]{1,2})\s*天/)?.[1]);
  const party = chineseNumber(input.match(/([一二两三四五六七八九十\d]{1,2})\s*人/)?.[1]);
  const budget = Number(input.match(/(?:预算|花费|控制在)\s*(\d{3,7})/)?.[1]) || 0;
  const startDate = input.match(/20\d{2}-\d{2}-\d{2}/)?.[0] || '';
  const pace = /轻松|悠闲|慢一点|不赶/.test(input) ? '慢一点' : /充实|多走|紧凑/.test(input) ? '多走走' : '';
  const targetDay = chineseNumber(input.match(/第\s*([一二两三四五六七八九十\d]{1,2})\s*天/)?.[1]);
  const placeNames = placeCatalog.filter(place => place.city === destination && (input.includes(place.name) || input.includes(place.name.split(/[（(·]/)[0]))).map(place => place.name);
  const removePlaces = /删除|移除|去掉|不要|换掉/.test(input) ? placeNames.filter(name => new RegExp(`(?:删除|移除|去掉|不要|换掉).{0,8}${name}`).test(input)) : [];
  const addPlaces = placeNames.filter(name => !removePlaces.includes(name));
  const action = /放松|减少景点/.test(input) ? 'relax' : /顺路|优化顺序/.test(input) ? 'reorder' : removePlaces.length ? 'remove' : 'add';
  if (!destination) throw new Error('网页演示版目前支持杭州、大理、成都、黄山、乌兰布统，请写出其中一个目的地。');
  if (mode === 'create' && !days) throw new Error('请写出天数，例如“从北京去乌兰布统玩四天”。');
  if (mode === 'adjust' && !addPlaces.length && !removePlaces.length && !days && !party && !budget && !startDate && !pace && action === 'add') throw new Error('网页演示版请明确写出要加入或移除的精选地点、天数、人数、预算或节奏。');
  return {destination, origin, days: days || 0, party: party || 0, budget, startDate, pace, targetDay:targetDay || 0, themes:[], mustVisit:mode === 'create' ? placeNames : [], addPlaces:mode === 'adjust' ? addPlaces : [], removePlaces, action, summary:'基于精选地点生成的网页演示草稿；请核对后确认保存。'};
}

export function answerStaticAssistant(message, current, plannedCost) {
  const q=String(message || '');
  if (!current?.days?.length) return '网页演示版可以查看精选地点和行程建议。先到「计划」写下目的地和天数，确认草稿后我可以帮你查看预算、下一站和每天的安排。';
  if (/预算|费用|花费|多少钱/.test(q)) return `${current.title} 的填写预算是 ¥${current.budget}，已规划的模拟费用约 ¥${plannedCost}，差额约 ¥${current.budget-plannedCost}。交通、住宿和门票的实际价格还未查询。`;
  if (/下一站|接下来/.test(q)) {const next=current.days.flatMap(day=>day.nodes).find(node=>!node.done);return next?`下一站是 ${next.name}，计划时间 ${next.time}。${next.note || ''}`:'当前行程的地点已全部标记到达。';}
  if (/第.{0,2}天|行程|安排/.test(q)) return current.days.map((day,i)=>`第 ${i+1} 天：${day.nodes.map(node=>node.name).join(' → ')}`).join('\n');
  if (/清单|准备/.test(q)) return `还有 ${current.checklist?.filter(item=>!item.done).length || 0} 项行前事项待完成。请在计划页「预算与清单」查看。`;
  return '当前是网页端基础助手，支持查看已保存行程的预算、下一站、每日安排和行前清单。若要自然语言调整行程，请在计划页输入具体地点或天数并确认草稿；自由问答需要连接模型服务。';
}
