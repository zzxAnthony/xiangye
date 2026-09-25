import { photos } from './data.js';

export const marketCategories=[
  {id:'all',name:'精选全部',icon:'compass'},
  {id:'transport',name:'车票机票',icon:'train'},
  {id:'stay',name:'精选住宿',icon:'bed'},
  {id:'tickets',name:'景点门票',icon:'ticket'},
  {id:'play',name:'当地玩乐',icon:'spark'},
  {id:'saved',name:'我的收藏',icon:'heart'},
  {id:'orders',name:'模拟订单',icon:'list'},
];

export const mockOffers=[
  {id:'train-am',category:'transport',kind:'高铁',title:'早班高铁 · 从容抵达',subtitle:'上午出发，午后开启第一站',price:169,unit:'人',duration:'约 2 小时',tags:['早出发','铁路方案'],image:photos.hangzhou,accent:'#315e4a',description:'模拟交通方案。具体车次、出发站、余票、实付价格和退改政策请在铁路 12306 核验。',link:'https://www.12306.cn/'},
  {id:'train-pm',category:'transport',kind:'高铁',title:'午后高铁 · 不必赶早',subtitle:'适合前一晚整理行李',price:139,unit:'人',duration:'约 2 小时',tags:['晚出发','铁路方案'],image:photos.dali,accent:'#5a7a68',description:'模拟交通方案，时刻与价格并非实时信息。请在铁路 12306 按出行日期查询。',link:'https://www.12306.cn/'},
  {id:'flight',category:'transport',kind:'机票',title:'直飞优选 · 航班方案',subtitle:'适合跨城较远的行程',price:599,unit:'人',duration:'时长待核验',tags:['直飞优先','航空方案'],image:photos.hero,accent:'#617d8d',description:'模拟航班方案。航线是否存在、航班、行李额和价格请在预订平台核验。',link:'https://www.ctrip.com/'},
  {id:'lake-stay',category:'stay',kind:'酒店',title:'湖畔轻居 · 设计感住宿',subtitle:'交通便利，适合慢节奏旅人',price:428,unit:'晚',duration:'入住时间待核验',tags:['近景点','可取消方案'],image:photos.hotel,accent:'#547767',description:'虚构的展示房型与模拟价格。位置、房态、税费和取消规则需在供应商页面核验。',link:'https://www.ctrip.com/'},
  {id:'local-stay',category:'stay',kind:'民宿',title:'巷里小院 · 住进当地生活',subtitle:'留一点时间给街巷与早餐',price:318,unit:'晚',duration:'入住时间待核验',tags:['街区漫游','慢旅行'],image:photos.dali,accent:'#a28266',description:'虚构的展示房型与模拟价格。具体民宿、地址、房态和规则需在供应商页面核验。',link:'https://www.ctrip.com/'},
  {id:'family-stay',category:'stay',kind:'酒店',title:'自在同行 · 家庭房方案',subtitle:'为多人出行预留更多空间',price:568,unit:'晚',duration:'入住时间待核验',tags:['家庭出行','多人入住'],image:photos.hotel,accent:'#ad9372',description:'虚构的展示房型与模拟价格。儿童政策和实际房型请在供应商页面核验。',link:'https://www.ctrip.com/'},
  {id:'museum-pass',category:'tickets',kind:'门票',title:'城市博物馆 · 半日体验',subtitle:'给雨天留一份室内灵感',price:58,unit:'人',duration:'约 2 小时',tags:['室内','文化'],image:photos.hangzhou,accent:'#80785e',description:'模拟门票产品。展馆可能免费或需要预约，实际价格和开放时间须以官方或供应商信息为准。',link:'https://www.ctrip.com/'},
  {id:'scenic-pass',category:'tickets',kind:'门票',title:'山水地标 · 一日游览',subtitle:'把经典风景留给完整的一天',price:128,unit:'人',duration:'约 1 天',tags:['自然','地标'],image:photos.huangshan,accent:'#58795d',description:'模拟门票产品。真实景区名称、预约要求、价格和天气风险需单独核验。',link:'https://www.ctrip.com/'},
  {id:'night-walk',category:'play',kind:'夜游',title:'城市夜行 · 街巷漫游',subtitle:'灯亮以后，还有另一种风景',price:88,unit:'人',duration:'约 2 小时',tags:['夜游','摄影'],image:photos.chengdu,accent:'#9a7055',description:'虚构的当地体验与模拟价格。实际活动、集合点、日期和使用规则需在平台核验。',link:'https://www.meituan.com/'},
  {id:'coffee-workshop',category:'play',kind:'团购',title:'咖啡与手作 · 慢半日',subtitle:'在旅途中留下亲手做的纪念',price:98,unit:'人',duration:'约 90 分钟',tags:['手作','双人可选'],image:photos.coffee,accent:'#9b765d',description:'虚构的当地体验与模拟价格。门店位置、预约和退款规则需在平台核验。',link:'https://www.meituan.com/'},
  {id:'family-explore',category:'play',kind:'亲子',title:'小小探索家 · 城市发现',subtitle:'让孩子也拥有自己的旅行记忆',price:118,unit:'人',duration:'约 2 小时',tags:['亲子','轻体验'],image:photos.hero,accent:'#768b60',description:'虚构的当地体验与模拟价格。适龄范围、入场与安全要求需在平台核验。',link:'https://www.meituan.com/'},
];
