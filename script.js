const products = [
  {id:1, name:'Rose Cleanser', cat:'Skincare', price:299, tag:'Bestseller', img:'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80', desc:'Gentle cleanser for daily glow.', variants:['Rose','Lavender','Aloe']},
  {id:2, name:'Glow Serum', cat:'Skincare', price:499, tag:'New', img:'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80', desc:'Brightening serum for radiant skin.', variants:['Vitamin C','Niacinamide','Hyaluronic']},
  {id:3, name:'Hydra Moisturizer', cat:'Skincare', price:399, tag:'Hot', img:'https://images.unsplash.com/photo-1527010261683-9e8f9f1f3c1f?auto=format&fit=crop&w=900&q=80', desc:'Rich cream for soft hydrated skin.', variants:['Day','Night','SPF']},
  {id:4, name:'Silk Shampoo', cat:'Haircare', price:349, tag:'Top Rated', img:'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80', desc:'Smooth and nourish your hair.', variants:['Smooth','Repair','Volume']},
  {id:5, name:'Hair Oil', cat:'Haircare', price:249, tag:'Herbal', img:'https://images.unsplash.com/photo-1590400746834-93d7af5d72f0?auto=format&fit=crop&w=900&q=80', desc:'Traditional oil blend for strong hair.', variants:['Coconut','Onion','Amla']},
  {id:6, name:'Body Butter', cat:'Bodycare', price:449, tag:'Soft Skin', img:'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80', desc:'Deep moisture for body care.', variants:['Shea','Cocoa','Mango']},
  {id:7, name:'Velvet Lip Tint', cat:'Makeup', price:299, tag:'Trend', img:'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80', desc:'Soft matte tint for everyday wear.', variants:['Rose','Berry','Nude','Coral']},
  {id:8, name:'Luxury Candle', cat:'Gifting', price:399, tag:'Gift', img:'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80', desc:'Elegant candle for gift sets.', variants:['Vanilla','Rose','Musk']},
  {id:9, name:'Festival Glow Box', cat:'Bundles', price:899, tag:'Offer', img:'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80', desc:'Complete premium beauty bundle.', variants:['Mini','Premium','Deluxe']},
  {id:10, name:'Travel Minis', cat:'Travel', price:599, tag:'Mini Pack', img:'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=80', desc:'Easy travel skincare essentials.', variants:['Pack of 3','Pack of 5','Pack of 7']}
];

const state = { cat:'All', cart: JSON.parse(localStorage.getItem('dg_cart') || '[]') };
const categories = ['All', ...new Set(products.map(p => p.cat))];

function saveCart(){ localStorage.setItem('dg_cart', JSON.stringify(state.cart)); }
function renderCategories(){ document.getElementById('categoryPills').innerHTML = categories.map(c => `<button class="pill ${state.cat===c?'active':''}" onclick="filterCat('${c}')">${c}</button>`).join(''); }
function renderProducts(){
  const root = document.getElementById('productGrid');
  const list = state.cat==='All' ? products : products.filter(p => p.cat===state.cat);
  root.innerHTML = list.map(p => `
    <div class="card reveal">
      <img src="${p.img}" alt="${p.name}">
      <div class="card-body">
        <span class="chip">${p.tag}</span>
        <h3>${p.name}</h3>
        <div class="small">${p.cat} • ${p.variants.join(', ')}</div>
        <div class="meta">
          <div class="price">₹${p.price}</div>
          <div class="small">★ 4.9</div>
        </div>
        <div class="actions">
          <button class="btn ghost" onclick="openProduct(${p.id})">View</button>
          <button class="btn primary" onclick="addToCart(${p.id})">Add</button>
        </div>
      </div>
    </div>
  `).join('');
}
function filterCat(c){ state.cat=c; renderCategories(); renderProducts(); }
function addToCart(id){
  const p = products.find(x => x.id===id);
  const found = state.cart.find(x => x.id===id);
  if(found) found.qty += 1;
  else state.cart.push({...p, qty:1, variant:p.variants[0]});
  saveCart(); updateCart(); openCart(); alert(`${p.name} added to cart`);
}
function updateCart(){
  document.getElementById('cartCount').innerText = state.cart.reduce((a,b)=>a+b.qty,0);
  const items = document.getElementById('cartItems');
  const sub = state.cart.reduce((a,b)=>a+b.price*b.qty,0);
  document.getElementById('subtotal').innerText = '₹'+sub;
  document.getElementById('total').innerText = '₹'+sub;
  items.innerHTML = state.cart.length ? state.cart.map((i, idx) => `
    <div class="cart-item">
      <img src="${i.img}" alt="${i.name}">
      <div>
        <b>${i.name}</b>
        <div class="small">${i.variant} • ₹${i.price}</div>
        <div class="qty">
          <button onclick="changeQty(${idx},-1)">-</button>
          <span>${i.qty}</span>
          <button onclick="changeQty(${idx},1)">+</button>
        </div>
      </div>
      <div><button class="icon-btn" style="width:36px;height:36px" onclick="removeItem(${idx})"><i class="fa-solid fa-trash"></i></button></div>
    </div>
  `).join('') : '<p class="small">Your cart is empty.</p>';
}
function changeQty(i,d){ state.cart[i].qty += d; if(state.cart[i].qty<=0) state.cart.splice(i,1); saveCart(); updateCart(); }
function removeItem(i){ state.cart.splice(i,1); saveCart(); updateCart(); }
function openCart(){ document.getElementById('sideCart').classList.add('open'); document.getElementById('overlay').classList.add('show'); }
function openAuth(){ document.getElementById('authModal').classList.add('show'); document.getElementById('overlay').classList.add('show'); }
function closeAuth(){ document.getElementById('authModal').classList.remove('show'); document.getElementById('overlay').classList.remove('show'); }
function checkout(){ alert('Checkout page can be added next'); }

function openProduct(id){
  const p = products.find(x => x.id===id);
  document.getElementById('detailName').innerText = p.name;
  document.getElementById('detailImg').src = p.img;
  document.getElementById('detailTag').innerText = p.tag;
  document.getElementById('detailDesc').innerText = p.desc;
  document.getElementById('detailPrice').innerText = '₹'+p.price;
  const variantSelect = document.getElementById('variantSelect');
  variantSelect.innerHTML = p.variants.map(v=>`<option value="${v}">${v}</option>`).join('');
  document.getElementById('detailAddBtn').onclick = () => {
    const variant = variantSelect.value;
    const found = state.cart.find(x => x.id===p.id && x.variant===variant);
    if(found) found.qty += 1;
    else state.cart.push({...p, qty:1, variant});
    saveCart(); updateCart(); closeProduct(); openCart();
    alert(`${p.name} (${variant}) added to cart`);
  };
  document.getElementById('productModal').classList.add('show');
  document.getElementById('overlay').classList.add('show');
}
function closeProduct(){ document.getElementById('productModal').classList.remove('show'); document.getElementById('overlay').classList.remove('show'); }
function closeAll(){ document.getElementById('sideCart').classList.remove('open'); document.getElementById('authModal').classList.remove('show'); document.getElementById('productModal').classList.remove('show'); document.getElementById('overlay').classList.remove('show'); }
function switchAuth(mode, btn){ document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active')); btn.classList.add('active'); document.getElementById('nameField').style.display = mode==='signup' ? 'block' : 'none'; }

renderCategories();
renderProducts();
updateCart();

new Chart(document.getElementById('salesChart'), {
  type:'line',
  data:{
    labels:['Jan','Feb','Mar','Apr','May','Jun'],
    datasets:[{
      data:[12000,18000,22000,28000,34000,42000],
      borderColor:'#e83e8c',
      backgroundColor:'rgba(232,62,140,.12)',
      fill:true,
      tension:.42,
      borderWidth:3
    }]
  },
  options:{
    responsive:true,
    plugins:{legend:{display:false}},
    scales:{y:{grid:{color:'#f1e3ea'}},x:{grid:{display:false}}}
  }
});