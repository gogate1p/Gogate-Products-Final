<template>
  <div class="min-h-screen bg-[#fafaf8] text-stone-900 font-sans">
    <!-- Top Announcement -->
    <header class="bg-emerald-900 text-emerald-100 py-3 px-6 text-xs flex justify-between items-center">
      <div class="flex items-center gap-2">
        <span class="bg-amber-400 text-stone-900 font-bold px-2 py-0.5 rounded text-[10px]">Nuxt 3 SSR</span>
        <span>Gogate Products Regional Storefront (Devgad Guild & Malvan Coast)</span>
      </div>
      <div class="hidden sm:flex gap-4 font-medium">
        <a href="http://localhost:3000" class="hover:text-white underline">Next.js Main Storefront ↗</a>
        <a href="http://localhost:3001" class="hover:text-white underline">Superadmin ↗</a>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="bg-white border-b border-stone-200 px-8 py-5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white font-black text-xl">
          🥭
        </span>
        <div>
          <h1 class="font-black text-lg text-stone-900 leading-tight">Gogate Products</h1>
          <span class="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">Devgad Cashews & Spices Hub</span>
        </div>
      </div>

      <div class="flex items-center gap-4 text-xs font-bold">
        <span class="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full">
          FSSAI: 11522046000789
        </span>
        <button class="bg-emerald-800 text-white px-4 py-2 rounded-xl hover:bg-emerald-900">
          Cart ({{ cartCount }})
        </button>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <section class="bg-gradient-to-r from-emerald-950 to-emerald-900 rounded-3xl p-8 text-white space-y-3">
        <span class="text-xs uppercase tracking-widest text-amber-400 font-bold">Regional Franchise Storefront</span>
        <h2 class="text-3xl font-black">Authentic Devgad Agro Harvest</h2>
        <p class="text-xs text-stone-300 max-w-xl">
          Powered by Nuxt 3 server-side rendering with instant edge delivery date (EDD) computation and unified gateway routing.
        </p>
      </section>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div v-for="prod in products" :key="prod.id" class="bg-white rounded-2xl border border-stone-200 p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div class="aspect-square bg-stone-100 rounded-xl overflow-hidden mb-4 relative">
              <img :src="prod.image" :alt="prod.name" class="w-full h-full object-cover" />
              <span class="absolute top-2 left-2 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {{ prod.category }}
              </span>
            </div>
            <span class="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              FSSAI: {{ prod.fssaiNo }}
            </span>
            <h3 class="font-bold text-stone-900 text-sm mt-2 line-clamp-2">{{ prod.name }}</h3>
            <p class="text-xs text-stone-400 font-mono mt-0.5">Mfr: {{ prod.manufacturer }}</p>
            <div class="flex items-baseline gap-2 mt-3">
              <span class="text-lg font-black text-stone-900">₹{{ prod.price }}</span>
              <span class="text-xs text-stone-400 line-through">₹{{ prod.mrp }}</span>
            </div>
          </div>
          <button @click="cartCount++" class="mt-4 w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition">
            + Add to Basket
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const cartCount = ref(1);

const products = [
  {
    id: 1,
    name: 'Devgad Giant Cashew Nuts W180 Grade (500g)',
    category: 'CASHEWS',
    price: 799,
    mrp: 950,
    fssaiNo: '11522046000789',
    manufacturer: 'Devgad Agro Cooperative',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=600'
  },
  {
    id: 2,
    name: 'Pure Wild Kokum Agal Extract (750ml)',
    category: 'KOKUM',
    price: 260,
    mrp: 320,
    fssaiNo: '11522046000789',
    manufacturer: 'Gogate Agro Farms',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600'
  },
  {
    id: 3,
    name: 'Coastal Sindhudurg Malvani Masala (500g)',
    category: 'SPICES',
    price: 380,
    mrp: 450,
    fssaiNo: '11522046000789',
    manufacturer: 'Devgad Guild',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600'
  }
];
</script>
