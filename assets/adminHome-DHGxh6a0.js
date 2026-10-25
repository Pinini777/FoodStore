import{l,g as m}from"./main-hBd3-FF4.js";import{p as u,c as g}from"./productos-DmPu_ryk.js";const i=document.getElementById("tabla-productos-body"),s=document.getElementById("form-producto"),p=document.getElementById("nombre"),E=document.getElementById("precio"),k=document.getElementById("stock"),c=document.getElementById("categoria"),f=document.getElementById("descripcion"),b=document.getElementById("mensaje-form"),v=document.getElementById("usuario-actual"),y=document.getElementById("logoutButton"),n=[...u],$=t=>t===0?"stock stock-agotado":t<=5?"stock stock-bajo":"stock",h=t=>{const e=document.createElement("tr");return e.innerHTML=`
    <td class="num">${t.id}</td>
    <td><img src="${t.imagen}" alt="${t.nombre}" width="50" height="50"></td>
    <td>${t.nombre}</td>
    <td>${t.categoria}</td>
    <td class="num">$${t.precio}</td>
    <td class="centro"><span class="${$(t.stock)}">${t.stock}</span></td>
    <td class="acciones">
      <a href="#" class="link-editar">Editar</a> |
      <a href="#" class="link-peligro">Eliminar</a>
    </td>
  `,e.querySelector(".link-editar").addEventListener("click",o=>{o.preventDefault(),alert("La edición de productos todavía no está disponible.")}),e.querySelector(".link-peligro").addEventListener("click",o=>{if(o.preventDefault(),!confirm(`¿Eliminar "${t.nombre}"?`))return;const r=n.findIndex(d=>d.id===t.id);n.splice(r,1),a()}),e},a=()=>{i.innerHTML="",n.forEach(t=>{i.appendChild(h(t))})},I=()=>{g.forEach(t=>{const e=document.createElement("option");e.value=t,e.textContent=t,c.appendChild(e)})},B=()=>{const t=n.map(e=>e.id);return t.length>0?Math.max(...t)+1:1};s.addEventListener("submit",t=>{t.preventDefault();const e={id:B(),nombre:p.value.trim(),descripcion:f.value.trim(),precio:Number(E.value),imagen:"/FoodStore/assets/img/logo.svg",sticker:"/FoodStore/assets/img/logo.svg",categoria:c.value,stock:Number(k.value)};n.push(e),a(),s.reset(),b.textContent=`Se agregó "${e.nombre}" a la tabla.`});const L=()=>{const t=m();t&&(v.textContent=`Hola, ${t.email}`)};y.addEventListener("click",()=>{l()});L();I();a();
