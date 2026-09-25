export const photos = {
  hero: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=1800&q=85',
  hangzhou: 'assets/hangzhou-west-lake.jpg',
  dali: 'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?w=900&q=85',
  chengdu: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=900&q=85',
  huangshan: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85',
  hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=85',
  coffee: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=85',
};

export const destinations = [
  { id:'hangzhou', name:'杭州', province:'浙江', tagline:'在湖光与山色之间，慢一点', type:'湖畔漫游', days:'3 天 2 晚', image:photos.hangzhou, color:'#7a9b86', lat:30.246, lng:120.148 },
  { id:'dali', name:'大理', province:'云南', tagline:'去有风的地方，把日子过慢', type:'自然疗愈', days:'4 天 3 晚', image:photos.dali, color:'#90aab0', lat:25.606, lng:100.267 },
  { id:'chengdu', name:'成都', province:'四川', tagline:'在烟火气里找到刚好的松弛', type:'城市烟火', days:'3 天 2 晚', image:photos.chengdu, color:'#bb9369', lat:30.657, lng:104.066 },
  { id:'huangshan', name:'黄山', province:'安徽', tagline:'山路有尽，风景无尽', type:'山野徒步', days:'2 天 1 晚', image:photos.huangshan, color:'#7e9475', lat:30.132, lng:118.169 },
];

export const sampleDays = [
  { label:'DAY 01', title:'初见杭州 · 湖边的慢时光', note:'抵达 · 湖滨 · 西湖', date:'', nodes:[
    { id:'d1a', time:'10:20', duration:'30 分钟', name:'杭州东站', type:'交通', note:'抵达杭州，留出出站与换乘时间', cost:0, costLabel:'城际班次待查询', status:'待查询', lat:30.293, lng:120.213, icon:'train', transport:'地铁 + 步行 · 约 35 分钟（参考）' },
    { id:'d1b', time:'12:00', duration:'75 分钟', name:'西湖东岸', type:'景点', note:'从湖滨出发，沿湖走走停停', cost:0, costLabel:'免费', status:'地图参考', lat:30.251, lng:120.151, icon:'landmark', transport:'步行 · 约 15 分钟（参考）' },
    { id:'d1c', time:'14:20', duration:'90 分钟', name:'湖滨街区', type:'餐饮', note:'找一家喜欢的店，留点自由时间', cost:85, costLabel:'餐饮估算 ¥85', status:'估算', lat:30.247, lng:120.161, icon:'coffee', transport:'步行 · 约 12 分钟（参考）' },
    { id:'d1d', time:'17:30', duration:'过夜', name:'湖滨周边住宿', type:'住宿', note:'房价与房态需按出行日期核验', cost:420, costLabel:'住宿估算 ¥420', status:'估算', lat:30.244, lng:120.168, icon:'bed', transport:null },
  ]},
  { label:'DAY 02', title:'往山里去 · 留给自然一天', note:'灵隐 · 山间 · 城西', date:'', nodes:[
    { id:'d2a', time:'09:00', duration:'30 分钟', name:'湖滨周边住宿', type:'住宿', note:'早餐后出发', cost:0, costLabel:'已计入前晚', status:'估算', lat:30.244, lng:120.168, icon:'bed', transport:'公交 / 打车 · 时长待查询' },
    { id:'d2b', time:'10:30', duration:'120 分钟', name:'灵隐周边', type:'景点', note:'寺院与山林，建议提前核验开放时间', cost:0, costLabel:'门票待查询', status:'待查询', lat:30.242, lng:120.106, icon:'landmark', transport:'步行 · 时长待查询' },
    { id:'d2c', time:'14:00', duration:'120 分钟', name:'山间步道', type:'自然', note:'留意天气与体力，按现场路况调整', cost:0, costLabel:'免费', status:'地图参考', lat:30.261, lng:120.107, icon:'trees', transport:'公交 / 打车 · 时长待查询' },
    { id:'d2d', time:'18:30', duration:'过夜', name:'城西周边住宿', type:'住宿', note:'住在第二天返程方便的位置', cost:380, costLabel:'住宿估算 ¥380', status:'估算', lat:30.265, lng:120.143, icon:'bed', transport:null },
  ]},
  { label:'DAY 03', title:'在城市里收尾 · 带着回忆返程', note:'博物馆 · 城市漫步 · 返程', date:'', nodes:[
    { id:'d3a', time:'09:00', duration:'30 分钟', name:'城西周边住宿', type:'住宿', note:'退房后寄存行李', cost:0, costLabel:'已计入前晚', status:'估算', lat:30.265, lng:120.143, icon:'bed', transport:'公交 / 打车 · 时长待查询' },
    { id:'d3b', time:'10:30', duration:'120 分钟', name:'浙江省博物馆', type:'室内', note:'雨天也适合，预约与开放时间需核验', cost:0, costLabel:'门票待查询', status:'待查询', lat:30.248, lng:120.174, icon:'museum', transport:'步行 · 约 15 分钟（参考）' },
    { id:'d3c', time:'14:00', duration:'90 分钟', name:'运河边咖啡与小展', type:'餐饮', note:'最后一站，给旅程一个慢收尾', cost:65, costLabel:'餐饮估算 ¥65', status:'估算', lat:30.284, lng:120.152, icon:'coffee', transport:'公交 / 地铁 · 时长待查询' },
    { id:'d3d', time:'17:00', duration:'返程', name:'杭州东站', type:'交通', note:'建议预留充足安检与候车时间', cost:0, costLabel:'返程班次待查询', status:'待查询', lat:30.293, lng:120.213, icon:'train', transport:null },
  ]},
];

export const replacementOptions = [
  { name:'城市书店与展览', type:'室内', note:'雨天友好 · 适合放慢脚步', cost:30, lat:30.254, lng:120.169, icon:'book' },
  { name:'运河边咖啡与小展', type:'餐饮', note:'有座位可休息 · 自由度高', cost:65, lat:30.284, lng:120.152, icon:'coffee' },
  { name:'西湖边自由漫步', type:'自然', note:'节奏更松 · 免费开放空间', cost:0, lat:30.255, lng:120.146, icon:'trees' },
];

export const samplePosts = [
  { id:'p1', author:'小鹿在路上', initial:'鹿', city:'杭州', title:'在西湖边，浪费一个下午', text:'没有赶景点，只是顺着湖边走。原来旅行最好的部分，是允许自己慢下来。', likes:128, image:photos.hangzhou, color:'#d7b495' },
  { id:'p2', author:'山谷来信', initial:'山', city:'黄山', title:'凌晨五点的山顶值得吗？', text:'云海从脚下升起来的那一刻，答案就有了。记得带一件防风外套。', likes:96, image:photos.huangshan, color:'#9cad8b' },
  { id:'p3', author:'阿茶', initial:'茶', city:'大理', title:'把日子交给风', text:'在洱海边骑车，遇见一场突然的雨，也遇见了最好的夕阳。', likes:204, image:photos.dali, color:'#a9bcbe' },
];

export const defaultChecklist = [
  { id:'c1', text:'检查身份证与出行证件', done:false },
  { id:'c2', text:'核验车次、车票与酒店订单', done:false },
  { id:'c3', text:'查看目的地天气与穿衣建议', done:false },
  { id:'c4', text:'充电器、充电宝与常用药', done:false },
];
