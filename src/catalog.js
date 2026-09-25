// Curated POI coordinates were checked against OpenStreetMap Nominatim on 2026-09-25.
// Opening hours, ticket prices and availability are intentionally not inferred.
export const placeCatalog = [
  {id:'hz-east',city:'杭州',name:'杭州东站',category:'交通',lat:30.2937959,lng:120.2087334,tags:['交通','城市'],duration:35,description:'杭州主要铁路枢纽。请以实际车票确认出发站和班次。'},
  {id:'hz-westlake',city:'杭州',name:'西湖',category:'自然',lat:30.2459837,lng:120.1431317,tags:['湖泊','自然','慢游','摄影'],duration:110,description:'杭州的湖光与步道。可沿湖边选择一小段慢慢走。'},
  {id:'hz-lingyin',city:'杭州',name:'灵隐寺',category:'人文',lat:30.2424012,lng:120.0976311,tags:['寺庙','人文','自然'],duration:110,description:'山林中的古寺。开放时间与预约规则请在出发前核验。'},
  {id:'hz-museum',city:'杭州',name:'浙江省博物馆',category:'展馆',lat:30.2535309,lng:120.1387829,tags:['博物馆','室内','人文','雨天'],duration:90,description:'孤山附近的博物馆，适合作为雨天备选。'},
  {id:'hz-hefang',city:'杭州',name:'河坊街',category:'街区',lat:30.2419047,lng:120.1556145,tags:['街区','美食','人文','城市'],duration:80,description:'老街区适合边走边看。热门时段可能较拥挤。'},
  {id:'hz-silk',city:'杭州',name:'中国丝绸博物馆',category:'展馆',lat:30.225126,lng:120.1465083,tags:['博物馆','室内','人文','雨天'],duration:90,description:'了解丝绸文化，建议事先确认开放时间。'},
  {id:'hz-gongchen',city:'杭州',name:'拱宸桥',category:'街区',lat:30.3204639,lng:120.1339172,tags:['运河','人文','摄影','街区'],duration:80,description:'大运河边的历史桥梁，适合安排在运河片区。'},
  {id:'dl-oldtown',city:'大理',name:'大理古城',category:'街区',lat:25.698269,lng:100.162485,tags:['街区','人文','美食','慢游'],duration:120,description:'在古城街巷中散步，适合留出自由探索时间。'},
  {id:'dl-erhai',city:'大理',name:'洱海',category:'自然',lat:25.7830826,lng:100.181115,tags:['湖泊','自然','摄影','骑行'],duration:150,description:'洱海范围很大，具体抵达点需在行程中进一步选定。'},
  {id:'dl-towers',city:'大理',name:'崇圣寺三塔',category:'人文',lat:25.7086408,lng:100.1465644,tags:['寺庙','人文','摄影'],duration:100,description:'大理地标之一，票价和开放时间待核验。'},
  {id:'dl-xizhou',city:'大理',name:'喜洲古镇',category:'街区',lat:25.8565745,lng:100.1300056,tags:['街区','人文','美食','慢游'],duration:120,description:'古镇与田野相接，建议和洱海北线放在同一天。'},
  {id:'cd-kuanzhai',city:'成都',name:'宽窄巷子',category:'街区',lat:30.6677721,lng:104.0479169,tags:['街区','美食','人文','城市'],duration:80,description:'成都的老街区，适合散步与小吃。'},
  {id:'cd-pandas',city:'成都',name:'成都大熊猫繁育研究基地',category:'自然',lat:30.7432278,lng:104.1329312,tags:['动物','自然','亲子'],duration:150,description:'建议查好当日预约、开放时间及抵达方式。'},
  {id:'cd-dufu',city:'成都',name:'杜甫草堂',category:'人文',lat:30.6628531,lng:104.0262287,tags:['园林','人文','慢游'],duration:100,description:'园林与诗歌文化，适合慢节奏游览。'},
  {id:'cd-wuhou',city:'成都',name:'武侯祠',category:'人文',lat:30.6478414,lng:104.0456552,tags:['人文','历史','室内'],duration:100,description:'历史文化景点，参观信息需出发前核验。'},
  {id:'cd-jinli',city:'成都',name:'锦里古街',category:'街区',lat:30.6488027,lng:104.0475097,tags:['街区','美食','夜游'],duration:80,description:'与武侯祠邻近，可放在同一段行程。'},
  {id:'hs-scenic',city:'黄山',name:'黄山风景区',category:'自然',lat:30.1383784,lng:118.1601569,tags:['山野','徒步','自然','摄影'],duration:300,description:'景区面积大，具体入口、线路和体力要求需单独规划。'},
  {id:'hs-hongcun',city:'黄山',name:'宏村',category:'街区',lat:30.004784,lng:117.9847312,tags:['古村','人文','摄影','慢游'],duration:120,description:'徽派村落，建议与景区分天安排。'},
  {id:'hs-xidi',city:'黄山',name:'西递',category:'街区',lat:29.8949209,lng:117.9676215,tags:['古村','人文','摄影'],duration:110,description:'古村景观，路程和门票需核验。'},
  {id:'hs-tunxi',city:'黄山',name:'屯溪老街',category:'街区',lat:29.710583,lng:118.3009139,tags:['街区','美食','人文','城市'],duration:90,description:'适合在抵达或返程当日安排。'},
  // Places are described by the Chifeng Culture and Tourism Bureau; WGS84 coordinates
  // were checked against Baidu Maps POIs on 2026-09-26.
  {id:'wl-scenic',city:'乌兰布统',name:'乌兰布统景区',category:'自然',lat:42.6016512,lng:117.1642192,tags:['草原','自然','摄影','日落'],duration:90,routeDay:1,description:'抵达后先熟悉景区与道路；日落观景点请按当天路况和天气选择。'},
  {id:'wl-general',city:'乌兰布统',name:'将军泡子（康熙大炮附近）',category:'人文',lat:42.5799465,lng:117.1367987,tags:['草原','古战场','人文','摄影'],duration:100,routeDay:2,description:'将军泡子古战场一带；坐标位于康熙大炮附近，实际游览入口请以现场为准。'},
  {id:'wl-princess',city:'乌兰布统',name:'公主湖',category:'自然',lat:42.6546505,lng:117.1233432,tags:['湖泊','草原','自然','摄影'],duration:100,routeDay:2,description:'草原中的湖泊，适合放慢节奏；开放与道路情况需出发前核验。'},
  {id:'wl-panlong',city:'乌兰布统',name:'盘龙峡谷',category:'自然',lat:42.6492227,lng:117.1943428,tags:['峡谷','自然','摄影'],duration:110,routeDay:2,description:'公主湖附近的峡谷方向；具体入口和道路通行需核验。'},
  {id:'wl-hamaba',city:'乌兰布统',name:'蛤蟆坝景区',category:'自然',lat:42.6728921,lng:117.349432,tags:['草原','白桦林','摄影','自然'],duration:120,routeDay:3,description:'景区位置较偏，往返车程与道路通行请单独核对。'},
  {id:'wl-donggou',city:'乌兰布统',name:'乌兰布统东沟摄影基地',category:'自然',lat:42.6649881,lng:117.2460793,tags:['草原','摄影','自然'],duration:90,routeDay:3,description:'与蛤蟆坝同处东部方向，可结合当天光线和天气安排。'},
  {id:'wl-north',city:'乌兰布统',name:'北沟',category:'自然',lat:42.5329489,lng:117.131307,tags:['草原','摄影','自然'],duration:80,routeDay:3,description:'景区南部的草原沟谷，具体游览范围请以现场标识为准。'},
  {id:'wl-wucai',city:'乌兰布统',name:'五彩山风景区观景台',category:'自然',lat:42.5036504,lng:117.1272754,tags:['山野','摄影','自然','秋景'],duration:90,routeDay:4,description:'位于景区南部；返程日建议控制停留时间。'},
  {id:'wl-studio',city:'乌兰布统',name:'乌兰布统影视基地',category:'人文',lat:42.5427367,lng:117.1529971,tags:['影视','摄影','草原'],duration:70,routeDay:4,description:'草原影视外景地；能否进入和游览时间请现场核验。'},
];

export const destinationTags = {
  杭州:['湖泊','慢游','人文','博物馆','城市'],
  大理:['湖泊','慢游','摄影','自然','骑行'],
  成都:['美食','人文','城市','亲子','街区'],
  黄山:['山野','徒步','自然','摄影','古村'],
  乌兰布统:['草原','摄影','自然','湖泊','慢游'],
};

export const haversineKm=(a,b)=>{
  if(!a?.lat||!b?.lat)return Infinity;
  const rad=x=>x*Math.PI/180, dLat=rad(b.lat-a.lat),dLng=rad(b.lng-a.lng);
  const h=Math.sin(dLat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLng/2)**2;
  return 6371*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h));
};

export function recommendDestinations(destinations,profile={},events=[],trips=[]){
  const interests=new Set(profile.interests||[]),recent=events.slice(-80),now=Date.now();
  return destinations.map(d=>{
    const tags=destinationTags[d.name]||[],matches=tags.filter(t=>interests.has(t));
    const views=recent.reduce((sum,e)=>{if(e.city!==d.name)return sum;const ageDays=Math.max(0,(now-(e.at||now))/86400000),freshness=Math.exp(-ageDays/21);return sum+freshness*(e.type==='save'?5:e.type==='article_view'?3:e.type==='trip_created'?4:1);},0);
    const planned=trips.some(t=>t.destination===d.name)?5:0;
    const groupFit=profile.group==='家庭'&&tags.includes('亲子')?7:0;
    const paceFit=profile.pace==='慢一点'&&tags.includes('慢游')?5:0;
    const score=20+matches.length*11+Math.min(20,views)+planned+groupFit+paceFit;
    const reason=matches.length?`契合你喜欢的${matches.slice(0,2).join('、')}`:views?`你最近关注过${d.name}`:planned?'与你的已有行程相关':groupFit?'适合家庭同行':'一条值得收藏的新路线';
    return {...d,score,reason};
  }).sort((a,b)=>b.score-a.score||a.name.localeCompare(b.name,'zh-CN'));
}

export function recommendPlaces(city,dayNodes=[],profile={},events=[],limit=4){
  const interests=new Set(profile.interests||[]),used=new Set(dayNodes.map(n=>n.placeId||n.catalogId||n.name));
  const points=dayNodes.filter(n=>n.lat&&n.lng);
  const center=points.length?{lat:points.reduce((s,n)=>s+n.lat,0)/points.length,lng:points.reduce((s,n)=>s+n.lng,0)/points.length}:null;
  return placeCatalog.filter(p=>p.city===city&&!used.has(p.id)&&!used.has(p.name)).map(p=>{
    const matched=p.tags.filter(t=>interests.has(t));
    const distance=center?haversineKm(center,p):null;
    const detour=points.length?Math.min(...points.map(n=>haversineKm(n,p))):null;
    const history=events.slice(-80).reduce((sum,e)=>{const ageDays=Math.max(0,(Date.now()-(e.at||Date.now()))/86400000);return sum+((e.tags||[]).some(t=>p.tags.includes(t))?Math.exp(-ageDays/21):0);},0);
    const proximity=detour==null?0:Math.max(-18,18-detour*3.5);
    const walkPenalty=profile.walking==='少走路'&&detour>4?-10:0;
    const slowPenalty=profile.pace==='慢一点'&&distance>8?-7:0;
    const groupFit=profile.group==='家庭'&&p.tags.includes('亲子')?6:0;
    const score=20+matched.length*11+Math.min(14,history*2.5)+proximity+walkPenalty+slowPenalty+groupFit;
    const reason=detour!=null&&detour<3?`距当天最近地点约 ${detour.toFixed(1)} km`:matched.length?`符合你偏好的${matched[0]}`:'可加入这天的路线';
    return {...p,score,reason,distanceKm:distance};
  }).sort((a,b)=>b.score-a.score||a.name.localeCompare(b.name,'zh-CN')).slice(0,limit);
}

export function buildCuratedDays(city,days,startDate){
  const pool=placeCatalog.filter(p=>p.city===city);
  const outings=pool.filter(p=>p.category!=='交通');
  const result=[];
  for(let i=0;i<days;i++){
    const chosen=outings.slice(i*2,i*2+2);
    const first=i===0?pool.find(p=>p.category==='交通'):null;
    const chosenPoints=[...(first?[first]:[]),...chosen];
    const nodes=chosenPoints.map((p,j)=>({id:`n-${Date.now()}-${i}-${j}`,placeId:p.id,day:i+1,time:j===0?'09:30':j===1?'12:00':'15:00',duration:`${p.duration} 分钟`,name:p.name,type:p.category,note:p.description,cost:p.category==='交通'?150:0,costLabel:p.category==='交通'?'交通预留 ¥150（模拟）':'费用待查询',status:p.category==='交通'?'模拟估算':'地图参考',lat:p.lat,lng:p.lng,coordinateSystem:'WGS84',source:'OpenStreetMap Nominatim',icon:p.category==='交通'?'train':p.category==='展馆'?'museum':p.category==='街区'?'landmark':'trees',transport:null}));
    const meal={id:`n-${Date.now()}-${i}-meal`,day:i+1,time:'13:30',duration:'60 分钟',name:`${city}午餐待选`,type:'餐饮',note:'按当天实际位置挑选，¥80 只是模拟预算',cost:80,costLabel:'餐饮预留 ¥80（模拟）',status:'模拟估算',lat:null,lng:null,icon:'coffee',transport:null};
    nodes.splice(Math.min(2,nodes.length),0,meal);
    if(i<days-1)nodes.push({id:`n-${Date.now()}-${i}-stay`,day:i+1,time:'18:00',duration:'过夜',name:`${city}住宿待选`,type:'住宿',note:'房价和房态需按日期核验，¥360 只是模拟预算',cost:360,costLabel:'住宿预留 ¥360（模拟）',status:'模拟估算',lat:null,lng:null,icon:'bed',transport:null});
    if(i===days-1){
      const station=pool.find(p=>p.category==='交通');
      nodes.push({id:`n-${Date.now()}-${i}-return`,placeId:station?.id||null,day:i+1,time:'17:00',duration:'返程',name:station?.name||`${city}返程交通待定`,type:'交通',note:'返程班次和出发点需按真实车票确认，¥150 只是模拟预算',cost:150,costLabel:'返程预留 ¥150（模拟）',status:'模拟估算',lat:station?.lat||null,lng:station?.lng||null,coordinateSystem:station?'WGS84':null,source:station?'OpenStreetMap Nominatim':null,icon:'train',transport:null});
    }
    const date=new Date(`${startDate}T12:00:00`);date.setDate(date.getDate()+i);
    result.push({label:`DAY ${String(i+1).padStart(2,'0')}`,title:i===0?`抵达${city} · 慢慢开始`:i===days-1?`在${city} · 留一点自由时间`:`${city}的另一面`,note:chosen.length?chosen.map(p=>p.name).join(' · '):'自由安排 · 可搜索真实地点加入',date:`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`,nodes});
  }
  return result;
}
