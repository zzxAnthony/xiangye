import { recommendPlaces } from './catalog.js';

export function plannerMarkup({trip,state,ico,safe,yen,formatDate,addDate,statusBadge,allNodes}){
  const selected=state.selectedDay==='all'?null:Math.max(1,Math.min(trip.days.length,Number(state.selectedDay)||1));
  const day=selected?trip.days[selected-1]:null;
  const activeNodes=day?.nodes||[];
  const suggestions=day?recommendPlaces(trip.destination,activeNodes,state.profile,state.profile.personalization?state.events:[],4):[];
  const emptySuggestions=selected===null?'点击上方日期查看地点推荐':'当前没有更多符合条件的精选地点，可通过“添加真实地点”搜索。';
  const known=activeNodes.filter(n=>n.lat&&n.lng).length;
  const plannedCost=allNodes.reduce((total,n)=>total+(Number(n.cost)||0),0);
  const route=state.routeDay===selected?state.route:null;
  const routeMeta=state.routeLoading?'正在查询真实道路路线…':route?`${route.distanceKm} km · 约 ${route.durationMin} 分钟 · ${route.mode==='auto'?'驾车':'步行'}`:state.routeError?'路线服务暂不可用':'选择一天查看实际道路路线';
  return `<main class="planner-page">
    <header class="planner-header">
      <div class="planner-title-block"><span class="planner-kicker">MY TRAVEL PLAN <i></i> ${trip.demo?'精选示例行程':'本地保存的行程'}</span><div class="planner-title-line"><h1>${safe(trip.destination)} <small>${trip.days.length} 天 ${Math.max(0,trip.days.length-1)} 晚</small></h1><span class="planner-version">v${trip.version}</span></div><p>${safe(trip.origin)}出发 · ${formatDate(trip.start)}—${formatDate(trip.end)} · ${trip.party} 人 · ${safe(trip.pace||'自由节奏')}</p></div>
      <div class="planner-header-actions"><select id="tripSelect" aria-label="切换行程">${state.trips.map(t=>`<option value="${safe(t.id)}" ${t.id===trip.id?'selected':''}>${safe(t.title)}</option>`).join('')}</select><button class="planner-ghost" data-modal="import">${ico('book',16)} 导入攻略</button><button class="planner-ghost" data-action="share">${ico('copy',16)} 分享</button><button class="planner-ghost" data-view="budget">${ico('wallet',16)} 预算与清单</button><button class="planner-primary" data-nav="new">${ico('plus',17)} 新建行程</button></div>
    </header>
    <div class="planner-context-row"><div><strong>${trip.days.length}</strong><span>旅行日</span></div><i></i><div><strong>${allNodes.length}</strong><span>计划地点</span></div><i></i><div><strong>${known}</strong><span>当天已定位</span></div><i></i><div><strong>${yen(trip.budget)}</strong><span>整单预算</span></div><span class="planner-context-note">地点与路网来自 OpenStreetMap；票价和营业时间待核验</span></div>
    <div class="planner-workspace">
      <aside class="planner-side">
        <div class="planner-side-top"><div><span class="eyebrow">ITINERARY</span><h2>沿途安排</h2></div><button data-modal="placeSearch" class="planner-add" aria-label="添加地点">${ico('plus',20)}</button></div>
        <div class="planner-day-strip"><button data-day="all" class="${selected===null?'active':''}">总览</button>${trip.days.map((d,i)=>`<button data-day="${i+1}" class="${selected===i+1?'active':''}"><small>DAY ${String(i+1).padStart(2,'0')}</small><b>${formatDate(addDate(trip.start,i))}</b></button>`).join('')}</div>
        ${selected===null?`<div class="planner-overview">${trip.days.map((d,i)=>`<button class="planner-overview-day" data-day="${i+1}"><span class="overview-number">0${i+1}</span><span><strong>${safe(d.title)}</strong><small>${d.nodes.length} 站 · ${safe(d.note)}</small></span>${ico('chevron',18)}</button>`).join('')}</div>`:
        `<div class="planner-day-heading"><span>第 ${selected} 天</span><strong>${safe(day.title)}</strong><small>${safe(day.note)}</small></div><div class="planner-route-bar">${ico('route',16)} <span>${safe(routeMeta)}</span></div>
        <div class="planner-stop-list">${activeNodes.map((n,i)=>`<div class="planner-stop ${state.selectedNode===n.id?'active':''}"><span class="planner-stop-index">${String(i+1).padStart(2,'0')}</span><button class="planner-stop-main" data-node="${safe(n.id)}"><span class="planner-stop-icon">${ico(n.icon||'pin',18)}</span><span class="planner-stop-body"><span class="planner-stop-time">${safe(n.time)} · ${safe(n.duration)}</span><strong>${safe(n.name)}</strong><small>${safe(n.type)} · ${safe(n.costLabel)}</small></span>${ico('chevron',16)}</button><div class="planner-stop-tools"><button data-move="up" data-id="${safe(n.id)}" aria-label="将${safe(n.name)}上移" ${i===0||n.locked?'disabled':''}>↑</button><button data-move="down" data-id="${safe(n.id)}" aria-label="将${safe(n.name)}下移" ${i===activeNodes.length-1||n.locked?'disabled':''}>↓</button></div></div>${i<activeNodes.length-1?`<div class="planner-connector">${route?.legs?.[i]?`${route.legs[i].distanceKm} km · 约 ${route.legs[i].durationMin} 分钟`:'下一站路程待查询'}</div>`:''}`).join('')}</div>`}
        <div class="planner-side-bottom"><button data-modal="placeSearch">${ico('plus',17)} 添加真实地点</button><button data-action="optimizeDay" ${selected===null?'disabled':''}>${ico('route',17)} 建议顺序</button></div>
      </aside>
      <section class="planner-map-panel">
        <div class="planner-map-header"><div><span class="eyebrow">MAP VIEW</span><strong>${selected===null?'多日地图总览':`第 ${selected} 天 · ${safe(trip.destination)}`}</strong></div><div><button data-action="fitMap" title="适配全部地点">${ico('map',18)}</button><button data-view="calendar" title="查看日历">${ico('calendar',18)}</button></div></div>
        <div class="planner-map-stage"><div id="map" role="application" aria-label="真实地理底图与行程地点"></div><div class="planner-map-legend"><span><i class="legend-real"></i> 已定位地点</span><span><i class="legend-route"></i> 路网路线</span></div><div class="planner-map-badge">${route?`${route.distanceKm} km 实际道路`:'地图地点已核对'} · 来源标注</div></div>
        <div class="planner-map-footer"><div>${ico('pin',16)} <span>地点坐标来源：OpenStreetMap Nominatim；道路路线：Valhalla / OpenStreetMap。住宿待选时不生成虚构标记。</span></div><button data-nav="journey">出发模式 ${ico('arrow',16)}</button></div>
      </section>
    </div>
    <section class="planner-recommendations"><div class="planner-recommend-heading"><div><span class="eyebrow">PICKED FOR THIS DAY</span><h2>${selected===null?'先选一天，再发现附近':'顺路可以看看'}</h2><p>${selected===null?'选择日期后，根据当天的地点与偏好推荐周边去处。':'结合路线位置、你喜欢的主题和最近浏览给出建议。'}</p></div><button data-nav="profile">调整偏好 ${ico('arrow',16)}</button></div><div class="planner-rec-grid">${suggestions.length?suggestions.map(p=>`<article class="planner-rec"><span class="planner-rec-category">${safe(p.category)}</span><strong>${safe(p.name)}</strong><p>${safe(p.reason)} · ${safe(p.description)}</p><div><span>${ico('pin',14)} 地图 POI 已核对</span><button data-add-catalog="${safe(p.id)}">加入这一天 ${ico('plus',15)}</button></div></article>`).join(''):`<div class="planner-rec-empty">${emptySuggestions}</div>`}</div></section>
  </main>`;
}
