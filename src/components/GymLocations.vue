<script setup>
import "leaflet/dist/leaflet.css"
import * as L from 'leaflet';
import { ref, onMounted } from 'vue';

const selectedLocation = ref('cbd')

const locations = [
    {
        id: 'cbd',
        name: 'CBD',
        area: 'Nairobi Central',
        address: 'Kimathi Street, Nairobi CBD',
        hours: 'Mon-Fri: 6am - 10pm',
        weekend: 'Sat-Sun: 6am - 6pm',
        phone: '+254 700 000000',
        coords: [-1.3073328374609299, 36.81211146039793],
        center: [-1.2953145569779758, 36.817184449599566],
        amenities: ['Weight Machines', 'Cardio Zone', 'Locker Rooms', 'Sauna and Steam Rooms'],
        tag: 'Flagship',
    },
    {
        id: 'kilimani',
        name: 'Kilimani',
        area: 'Kilimani',
        address: 'Argwings Kodhek Rd, Kilimani',
        hours: 'Mon–Fri: 5:30 AM – 10:00 PM',
        weekend: 'Sat–Sun: 7:00 AM – 7:00 PM',
        phone: '+254 700 333 444',
        coords: [-1.2921, 36.7762],
        center: [-1.2921, 36.7762],
        amenities: ['Pool', 'Yoga Studio', 'Sauna', 'Personal Training'],
        tag: 'Premium',
    },
    {
        id: 'westlands',
        name: 'Westlands',
        area: 'Westlands',
        address: 'Waiyaki Way, Westlands',
        hours: 'Mon–Fri: 5:00 AM – 11:00 PM',
        weekend: 'Sat–Sun: 6:00 AM – 9:00 PM',
        phone: '+254 700 555 666',
        coords: [-1.2382, 36.8046],
        center: [-1.2382, 36.8046],
        amenities: ['24/7 Access', 'Spin Studio', 'Boxing Ring', 'Café'],
        tag: '24/7',
    },
]
const maps = ref({});

const makeIcon = (active = false) => L.divIcon({
    className: '',
    html: `
    <div style="
        width: ${active ? 18 : 14}px;
        height: ${active ? 18 : 14}px;
        background: ${active ? '#c8ff00' : '#ffffff'};
        border: 2px solid ${active ? '#0a0a0a' : 'rgba(255, 255, 255, 0.4)'};
        border-radius: 50%;
        box-shadow: 0 0 ${active ? '12px' : '4px'} ${active ? 'rgba(200, 255, 0, 0.6)' : 'rgba(0, 0, 0, 0.4)'};
        "></div>
        `,
    iconSize: [active ? 18 : 14, active ? 18 : 14],
    iconAnchor: [active ? 9 : 7, active ? 9 : 7],
})

onMounted(() => {
    locations.forEach(loc => {
        const map = L.map(`map-${loc.id}`, {
            zoomControl: false,
            scrollWheelZoom: false,
            dragging: false,
            doubleClickZoom: false,
        }).setView(loc.center, 15)

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}/{r}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap &copy; CART0'
        }).addTo(map)

        L.marker(loc.coords, { icon: makeIcon(true) }).addTo(map)

        maps.value[loc.id] = map
    })
})

const select = (id) => { selectedLocation.value = id }
const activeLocation = () => locations.find(l => l.id === selectedLocation.value)
</script>

<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" />

    <div class="locations-page">
        <!--Hero-->
        <section class="hero">
            <div class="hero-eyebrow">WHERE TO FIND US</div>
            <h1 class="hero-title">OUR<br><em>LOCATIONS.</em></h1>
            <p class="hero-sub">Three premier gym locations across Nairobi - find the closest one to you.</p>
        </section>

        <!--Locations-->
        <div class="tabs-bar">
            <button v-for="loc in locations" :key="loc.id" class="tab-btn"
                :class="{ 'tab-btn--active': selectedLocation === loc.id }" @click="select(loc.id)">
                <span class="tab-tag">{{ loc.tag }}</span>
                {{ loc.name }}
            </button>
        </div>

        <!--Location Cards-->
        <div class="locations-grid">
            <div v-for="loc in locations" :key="loc.id" class="location-block"
                :class="{ 'location-block--active': selectedLocation === loc.id }" @click="select(loc.id)">

                <div class="map-wrap">
                    <div :id="`map-${loc.id}`" class="map"></div>
                    <div class="map-overlay" v-if="selectedLocation !== loc.id">
                        <span class="map-click-hint">Click to Explore</span>
                    </div>
                    <div class="map-tag">{{ loc.tag }}</div>
                </div>

                <div class="location-info">
                    <div class="location-area">{{ loc.area }}</div>
                    <h2 class="location-name">{{ loc.name }}</h2>
                    <div class="info-row">
                        <v-icon icon="mdi-map-marker-outline" class="info-icon"></v-icon>
                        <span>{{ loc.address }}</span>
                    </div>
                    <div class="info-row">
                        <v-icon icon="mdi-clock-outline" class="info-icon"></v-icon>
                        <div>
                            <div>{{ loc.hours }}</div>
                            <div>{{ loc.weekend }}</div>
                        </div>
                    </div>
                    <div class="info-row">
                        <v-icon icon="mdi-phone-outline" class="info-icon"></v-icon>
                        <span>{{ loc.phone }}</span>
                    </div>

                    <div class="amenities">
                        <span v-for="a in loc.amenities" :key="a" class="amenity-pill">{{ a }}</span>
                    </div>

                    <button class="get-directions-btn">GET DIRECTIONS →</button>
                </div>
            </div>
        </div>

        <!--CTA Strip-->
        <section class="cta-strip">
            <div class="cta-inner">
                <div class="cta-text">
                    <h2 class="cta-title">NOT A MEMBER YET?</h2>
                    <p class="cta-sub">Join MacFit today and begin your fitness journey with us with access to all three locations.</p>
                </div>
                <div class="cta-actions">
                    <a href="/signUp" class="cta-btn-primary">JOIN NOW</a>
                    <a href="/bundles" class="cta-btn-ghost">VIEW BUNDLES</a>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.locations-page {
    font-family: 'Barlow', sans-serif;
    background: #0a0a0a;
    color: #f0ede6;
    min-height: 100vh;
}

/* Hero Section */
.hero {
    text-align: center;
    padding: 8rem 2rem 4rem;
    background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(200, 255, 0, 0.07) 0%, transparent 70%);
    border-bottom: 1px solid rgba(200, 255, 0, 0.7);
}

.hero-eyebrow {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.32em;
    color: #c8ff00;
    margin-bottom: 1rem;
}

.hero-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(3.5rem, 8vw, 7rem);
    font-weight: 900;
    text-transform: uppercase;
    line-height: 0.9;
    margin-bottom: 1.2rem;
}

.hero-title em { font-style: italic; color: #c8ff00; }
.hero-sub {
    font-size: 1rem;
    font-weight: 300;
    color: rgba(240, 237, 230, 0.5);
}

/* Tabs Bar */
.tabs-bar {
    display: flex;
    justify-content: center;
    gap: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    background: #0d0d0d;
    overflow-x: auto;
}

.tab-btn {
    position: relative;
    padding: 1.1rem 2.2rem;
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    color: rgba(240, 237, 230, 0.4);
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    white-space: nowrap;
    transition: color 0.2s, border-color 0.2s;
}

.tab-btn:hover { color: rgba(240, 237, 230, 0.75); }
.tab-btn--active {
    color: #f0ede6;
    border-bottom-color: #c8ff00;
}

.tab-tag {
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    padding: 0.15rem 0.45rem;
    background: rgba(200, 255, 0, 0.15);
    color: #c8ff00;
    border-radius: 0;
}

/* Locations Grid */
.locations-grid {
    display: flex;
    flex-direction: column;
    gap: 1px;
    background: rgba(255, 255, 255, 0.06);
    max-width: 1200px;
    margin: 3rem auto;
    padding: 0 4vw;
}

.location-block {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: #0f0f0f;
    border: 1px solid rgba(255, 255, 255, 0.06);
    cursor: pointer;
    transition: border-color 0.3s ease;
    overflow: hidden;
}

.location-block:nth-child(even) {
    grid-template-columns: 1fr 1fr;
    direction: rtl;
}

.location-block:hover { border-color: rgba(200, 255, 0, 0.12); }
.location-block--active { border-color: rgba(200, 255, 0, 0.3); }

@media (max-width: 760px) {
    .location-block,
    .location-block:nth-child(even) {
        grid-template-columns: 1fr;
        direction: ltr;
    }
}

/* Map Styles */
.map-wrap {
    position: relative;
    height: 360px;
}

.map {
    width: 100%;
    height: 100%;
}

.map :deep(.leaflet-control-attribution) {
    background: rgba(0, 0, 0, 0.5) !important;
    color: rgba(255, 255, 255, 0.3) !important;
    font-size: 9px !important;
}

.map-overlay {
    position: absolute;
    inset: 0;
    background: rgba(10, 10, 10, 0.45);
    display: grid;
    place-items: center;
    z-index: 500;
    transition: opacity 0.2s;
}

.map-click-hint {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(240, 237, 230, 0.2);
    border: 1px solid rgba(240, 237, 230, 0.2);
    padding: 0.5rem 1rem;
}

.map-tag {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: #c8ff00;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    padding: 0.28rem 0.65rem;
    z-index: 600;
    text-transform: uppercase;
}

/* Location Info */
.location-info {
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.6rem;
}

.location-area {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.28em;
    color: #c8ff00;
    text-transform: uppercase;
}

.location-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 2rem;
    font-weight: 900;
    text-transform: uppercase;
    color: #f0ede6;
    line-height: 1;
    margin-bottom: 0.6rem;
}

.info-row {
    display: flex;
    align-items: flex-start;
    gap: 0.65rem;
    font-size: 0.85rem;
    color: rgba(240, 237, 230, 0.55);
    line-height: 1.55;
}

.info-icon {
    font-size: 1rem !important;
    color: rgba(240, 237, 230, 0.4) !important;
    flex-shrink: 0;
    margin-top: 0.1rem;
}

/* Amenities */
.amenities {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.4rem;
}

.amenity-pill {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.28rem 0.65rem;
    border: 1px solid rgba(200, 255, 0, 0.4);
    color: rgba(200, 255, 0, 0.6);
}

.get-directions-btn {
    margin-top: 0.8rem;
    align-self: flex-start;
    padding: 0.7rem 1.4rem;
    background: transparent;
    border: 2px solid rgba(240, 237, 230, 0.2);
    color: rgba(240, 237, 230, 0.65);
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.88rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    clip-path: polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%);
    transition: all 0.2s;
}

.get-directions-btn:hover {
    border-color: #c8ff00;
    color: #c8ff00;
    background: rgba(200, 255, 0, 0.07);
}

.location-block--active .get-directions-btn {
    border-color: rgba(200, 255, 0, 0.35);
    color: #c8ff00;
}

/* CTA Strip */
.cta-strip {
    background: #0d0d0d;
    border-top: 1px solid rgba(200, 255, 0, 0.08);
    padding: 4rem 4vw;
}

.cta-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
}

.cta-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900;
    text-transform: uppercase;
    color: #f0ede6;
    margin-bottom: 0.4rem;
}

.cta-sub {
    font-size: 0.9rem;
    color: rgba(240, 237, 230, 0.45);
    max-width: 420px;
}

.cta-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.cta-btn-primary {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    color: #0a0a0a;
    background: #c8ff00;
    padding: 0.85rem 2rem;
    clip-path: polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%);
    transition: background 0.2s, transform 0.15s;
}

.cta-btn-primary:hover { background: #d9ff33; transform: translateY(-1px); }
.cta-btn-ghost {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    color: rgba(240, 237, 230, 0.6);
    border: 1px solid rgba(240, 237, 230, 0.15);
    padding: 0.85rem 2rem;
    transition: all 0.2s;
}

.cta-btn-ghost:hover {
    border-color: rgba(240, 237, 230, 0.35);
    color: #f0ede6;
}
</style>

