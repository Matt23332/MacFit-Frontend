<script setup>
import { ref, computed } from 'vue'

// Mock logged-in user data
const user = ref({
  firstName: 'John',
  lastName:  'Doe',
  bundle:    'PRO',
  bundleExpiry: '2026-06-15',
  gymLocation: 'MacFit Westlands',
  joinDate: '2025-01-10',
  avatar: null,
})

const stats = ref([
  { label: 'Workouts This Month', value: 14,   icon: 'mdi-dumbbell',         unit: '' },
  { label: 'Classes Attended',    value: 8,    icon: 'mdi-account-group',    unit: '' },
  { label: 'Current Streak',      value: 5,    icon: 'mdi-fire',             unit: 'days' },
  { label: 'Calories Burned',     value: 9240, icon: 'mdi-lightning-bolt',   unit: 'kcal' },
])

const upcomingClasses = ref([
  { id: 1, name: 'HIIT Blast',     trainer: 'Coach Amina',  time: 'Today, 6:00 AM',    duration: 45, spots: 3,  tag: 'High Intensity', booked: true  },
  { id: 2, name: 'Yoga Flow',      trainer: 'Coach Priya',  time: 'Today, 5:30 PM',    duration: 60, spots: 8,  tag: 'Recovery',       booked: false },
  { id: 3, name: 'Spin Cycle',     trainer: 'Coach James',  time: 'Tomorrow, 7:00 AM', duration: 50, spots: 2,  tag: 'Cardio',         booked: false },
  { id: 4, name: 'Strength & Core',trainer: 'Coach Kevin',  time: 'Tomorrow, 6:00 PM', duration: 55, spots: 6,  tag: 'Strength',       booked: true  },
])

const recentActivity = ref([
  { id: 1, type: 'Workout',  desc: 'Upper Body Strength',  date: 'Today, 8:30 AM',      duration: '55 min', icon: 'mdi-dumbbell' },
  { id: 2, type: 'Class',    desc: 'HIIT Blast',           date: 'Yesterday, 6:00 AM',  duration: '45 min', icon: 'mdi-account-group' },
  { id: 3, type: 'Check-in', desc: 'MacFit Westlands',     date: 'Yesterday, 5:55 AM',  duration: null,     icon: 'mdi-map-marker-check' },
  { id: 4, type: 'Workout',  desc: 'Leg Day',              date: 'Mon, 7:00 PM',        duration: '60 min', icon: 'mdi-dumbbell' },
  { id: 5, type: 'Class',    desc: 'Yoga Flow',            date: 'Sun, 5:30 PM',        duration: '60 min', icon: 'mdi-account-group' },
])

const announcements = ref([
  { id: 1, title: 'Pool Maintenance', body: 'The swimming pool at Westlands will be closed for maintenance on March 15–16.', type: 'warning', date: '2 days ago' },
  { id: 2, title: 'New Spin Bikes!',  body: 'We just installed 12 brand-new Technogym spin bikes in Studio B. Come try them!', type: 'info',    date: '4 days ago' },
  { id: 3, title: 'Easter Challenge', body: 'Join our 30-day Easter fitness challenge starting April 1st. Top 3 win free bundles!', type: 'promo',   date: '1 week ago' },
])

const quickActions = [
  { label: 'Book a Class',     icon: 'mdi-calendar-plus',      color: '#c8ff00', to: '/classes' },
  { label: 'View Schedule',    icon: 'mdi-calendar-month',     color: '#c8ff00', to: '/schedule' },
  { label: 'My Bundle',        icon: 'mdi-card-account-details',color: '#c8ff00', to: '/bundles' },
  { label: 'Contact Trainer',  icon: 'mdi-message-outline',    color: '#c8ff00', to: '/trainers' },
  { label: 'Gym Locations',    icon: 'mdi-map-marker-outline', color: '#c8ff00', to: '/gymLocations' },
  { label: 'Edit Profile',     icon: 'mdi-account-edit',       color: '#c8ff00', to: '/profile' },
]

const daysUntilExpiry = computed(() => {
  const today  = new Date()
  const expiry = new Date(user.value.bundleExpiry)
  return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))
})

const expiryWarning = computed(() => daysUntilExpiry.value <= 14)

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
})

const announcementColors = { warning: '#ffaa00', info: '#4db8ff', promo: '#c8ff00' }
const announcementIcons  = { warning: 'mdi-alert-circle-outline', info: 'mdi-information-outline', promo: 'mdi-trophy-outline' }

const bookedClass = ref(null)
const bookClass = (cls) => {
  cls.booked = true
  cls.spots  = Math.max(0, cls.spots - 1)
  bookedClass.value = cls.name
  setTimeout(() => bookedClass.value = null, 3000)
}

const tagColors = {
  'High Intensity': '#ff6b6b',
  'Recovery':       '#88ddaa',
  'Cardio':         '#4db8ff',
  'Strength':       '#c8ff00',
}
</script>

<template>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,900;1,700;1,900&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet" />

  <div class="home-page">

    <!-- ── TOAST ──────────────────────────────────────────── -->
    <transition name="toast">
      <div v-if="bookedClass" class="toast">
        <v-icon icon="mdi-check-circle" class="toast-icon"></v-icon>
        {{ bookedClass }} booked successfully!
      </div>
    </transition>

    <!-- ── TOP BAR ────────────────────────────────────────── -->
    <div class="top-bar">
      <div class="top-bar-inner">
        <div class="welcome-block">
          <div class="welcome-greeting">{{ greeting }},</div>
          <div class="welcome-name">{{ user.firstName }} {{ user.lastName }}</div>
        </div>
        <div class="top-bar-right">
          <div class="bundle-badge" :class="{ 'bundle-badge--warn': expiryWarning }">
            <v-icon icon="mdi-star-circle" class="badge-icon"></v-icon>
            <span>{{ user.bundle }}</span>
            <span class="badge-sep">·</span>
            <span :class="{ 'text-warn': expiryWarning }">
              {{ expiryWarning ? `Expires in ${daysUntilExpiry} days` : `${daysUntilExpiry} days left` }}
            </span>
          </div>
          <div class="location-pill">
            <v-icon icon="mdi-map-marker" class="location-icon"></v-icon>
            {{ user.gymLocation }}
          </div>
        </div>
      </div>
    </div>

    <div class="page-content">

      <!-- ── STATS ROW ───────────────────────────────────── -->
      <section class="stats-row">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="stat-card"
        >
          <div class="stat-icon-wrap">
            <v-icon :icon="stat.icon" class="stat-icon"></v-icon>
          </div>
          <div class="stat-body">
            <div class="stat-value">
              {{ stat.value.toLocaleString() }}
              <span v-if="stat.unit" class="stat-unit">{{ stat.unit }}</span>
            </div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </section>

      <!-- ── MAIN GRID ───────────────────────────────────── -->
      <div class="main-grid">

        <!-- LEFT COLUMN ──────────────────────────────────── -->
        <div class="left-col">

          <!-- Upcoming Classes -->
          <div class="panel">
            <div class="panel-header">
              <div class="panel-title-group">
                <span class="panel-eyebrow">SCHEDULE</span>
                <h2 class="panel-title">Upcoming Classes</h2>
              </div>
              <a href="/schedule" class="panel-link">View all →</a>
            </div>

            <div class="classes-list">
              <div
                v-for="cls in upcomingClasses"
                :key="cls.id"
                class="class-card"
                :class="{ 'class-card--booked': cls.booked }"
              >
                <div class="class-left">
                  <div class="class-tag" :style="{ background: tagColors[cls.tag] + '22', color: tagColors[cls.tag] }">
                    {{ cls.tag }}
                  </div>
                  <div class="class-name">{{ cls.name }}</div>
                  <div class="class-meta">
                    <span><v-icon icon="mdi-account-tie" size="13"></v-icon> {{ cls.trainer }}</span>
                    <span><v-icon icon="mdi-clock-outline" size="13"></v-icon> {{ cls.duration }} min</span>
                    <span><v-icon icon="mdi-account-multiple" size="13"></v-icon> {{ cls.spots }} spots left</span>
                  </div>
                </div>
                <div class="class-right">
                  <div class="class-time">{{ cls.time }}</div>
                  <button
                    class="class-btn"
                    :class="{ 'class-btn--booked': cls.booked }"
                    :disabled="cls.booked"
                    @click="bookClass(cls)"
                  >
                    <v-icon :icon="cls.booked ? 'mdi-check' : 'mdi-plus'" size="16"></v-icon>
                    {{ cls.booked ? 'Booked' : 'Book' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="panel">
            <div class="panel-header">
              <div class="panel-title-group">
                <span class="panel-eyebrow">HISTORY</span>
                <h2 class="panel-title">Recent Activity</h2>
              </div>
              <a href="/activity" class="panel-link">View all →</a>
            </div>

            <div class="activity-list">
              <div v-for="item in recentActivity" :key="item.id" class="activity-item">
                <div class="activity-icon-wrap">
                  <v-icon :icon="item.icon" class="activity-icon"></v-icon>
                </div>
                <div class="activity-body">
                  <div class="activity-desc">{{ item.desc }}</div>
                  <div class="activity-meta">
                    <span>{{ item.type }}</span>
                    <span v-if="item.duration">· {{ item.duration }}</span>
                  </div>
                </div>
                <div class="activity-date">{{ item.date }}</div>
              </div>
            </div>
          </div>

        </div>

        <!-- RIGHT COLUMN ─────────────────────────────────── -->
        <div class="right-col">

          <!-- Bundle Card -->
          <div class="panel bundle-panel" :class="{ 'bundle-panel--warn': expiryWarning }">
            <div class="panel-eyebrow">MEMBERSHIP</div>
            <div class="bundle-name">{{ user.bundle }} <span>MEMBER</span></div>
            <div class="bundle-detail">
              <v-icon icon="mdi-map-marker-outline" size="15"></v-icon>
              {{ user.gymLocation }}
            </div>
            <div class="bundle-detail">
              <v-icon icon="mdi-calendar-outline" size="15"></v-icon>
              Expires {{ new Date(user.bundleExpiry).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' }) }}
            </div>
            <div class="bundle-bar-wrap">
              <div class="bundle-bar">
                <div
                  class="bundle-bar-fill"
                  :style="{ width: Math.min(100, Math.max(0, (daysUntilExpiry / 365) * 100)) + '%' }"
                ></div>
              </div>
              <span class="bundle-days">{{ daysUntilExpiry }} days remaining</span>
            </div>
            <button class="upgrade-btn">
              {{ expiryWarning ? 'RENEW NOW →' : 'UPGRADE PLAN →' }}
            </button>
          </div>

          <!-- Quick Actions -->
          <div class="panel">
            <div class="panel-title-group" style="margin-bottom:1.2rem">
              <span class="panel-eyebrow">SHORTCUTS</span>
              <h2 class="panel-title">Quick Actions</h2>
            </div>
            <div class="actions-grid"
              
                v-for="action in quickActions"
                :key="action.label"
                :href="action.to"
                :class="action-chip"
              >
                <v-icon :icon="action.icon" class="action-icon"></v-icon>
                <span>{{ action.label }}</span>
              
            </div>
          </div>

          <!-- Announcements -->
          <div class="panel">
            <div class="panel-header">
              <div class="panel-title-group">
                <span class="panel-eyebrow">YOUR GYM</span>
                <h2 class="panel-title">Announcements</h2>
              </div>
            </div>
            <div class="announcement-list">
              <div
                v-for="ann in announcements"
                :key="ann.id"
                class="announcement-item"
                :style="{ borderLeftColor: announcementColors[ann.type] }"
              >
                <div class="ann-header">
                  <v-icon
                    :icon="announcementIcons[ann.type]"
                    class="ann-icon"
                    :style="{ color: announcementColors[ann.type] }"
                  ></v-icon>
                  <span class="ann-title">{{ ann.title }}</span>
                  <span class="ann-date">{{ ann.date }}</span>
                </div>
                <p class="ann-body">{{ ann.body }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.home-page {
    font-family: 'Barlow', sans-serif;
    background: #0a0a0a;
    color: #f0ede6;
    min-height: 100vh;
}

.toast {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: #c8ff00;
    color: #0a0a0a;
    font-weight: 600;
    font-size: 0.88rem;
    padding: 0.85rem 1.4rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 9999;
    box-shadow: 0 8px 32px rgba(200, 255, 0, 0.25);
    clip-path: polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%);
}

.toast-icon { font-size: 1.1rem !important; color: #0a0a0a !important; }
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(16px); }

.top-bar {
    background: #0d0d0d;
    border-bottom: 1px solid rgba(200, 255, 0, 0.08);
    padding: 1.2rem 0;
    position: sticky;
    top: 68px;
    z-index: 100;
}

.top-bar-inner {
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
}

.welcome-greeting {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    line-height: 1;
    color: #f0ede6;
}

.welcome-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
    line-height: 1;
    color: #f0ede6;
}

.top-bar-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
}

.bundle-badge {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(200, 255, 0, 0.1);
    border: 1px solid rgba(200, 255, 0, 0.25);
    padding: 0.4rem 0.9rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: #c8ff00;
    letter-spacing: 0.05em;
}

.bundle-badge--warn {
    background: rgba(255, 170, 0, 0.1);
    border-color: rgba(255, 170, 0, 0.35);
    color: #ffaa00;
}

.badge-icon { font-size: 0.95rem !important; color: currentColor !important; }
.badge-sep { opacity: 0.4; }
.text-warn { color: #ffaa00; }

.location-pill {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.78rem;
    font-weight: 500;
    color: rgba(240, 237, 230, 0.5);
    padding: 0.4rem 0.9rem;
    border: 1px solid rgba(255, 255, 255, 0.7);
}

.location-icon { font-size: 0.9rem !important; color: rgba(240, 237, 230, 0.4) !important; }

/*Page Content*/
.page-content {
    max-width: 1300px;
    margin: 0 auto;
    padding: 2.5rem 2.5rem 4rem;
}

.stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: rgba(255, 255, 255, 0.5);
    margin-bottom: 2rem;
}

@media (max-width: 900px) { .stats-row { grid-template-columns: repeat(2, 1fr); }}
@media (max-width: 480px) { .stats-row { grid-template-columns: 1fr; }}

.stat-card {
    background: #0f0f0f;
    padding: 1.4rem 1.6rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: background 0.2s;
}

.stat-card:hover { background: #141414; }

.stat-icon-wrap {
    width: 44px;
    height: 44px;
    background: rgba(200, 255, 0, 0.08);
    display: grid;
    place-items: center;
    flex-shrink: 0;
    clip-path: polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%);
}

.stat-icon { font-size: 1.3rem !important; color: #c8ff00 !important; }
.stat-value {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 1.9rem;
    line-height: 1;
    color: #f0ede6;
}

.stat-unit { font-size: 1rem; color: rgba(240, 237, 230, 0.4); }
.stat-label {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(240, 237, 230, 0);
    margin-top: 0.2rem;
}

/* Main Grid */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 1.5rem;
  align-items: start;
}

@media (max-width: 1100px) {
  .main-grid {
    grid-template-columns: 1fr;
  }
}

.left-col, 
.right-col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.panel {
  background: #0f0f0f;
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.6rem;
}

.panel-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 1.4rem;
}

.panel-title-group {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.panel-eyebrow {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  color: #c8ff00;
  text-transform: uppercase;
}

.panel-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #f0ede6;
  line-height: 1;
}

.panel-link {
  font-size: 0.75rem;
  color: rgba(240, 237, 230, 0.4);
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.05em;
  transition: color 0.2s;
}

.panel-link:hover {
  color: #c8ff00;
}

/* Classes */
.classes-list {
  display: flex;
  flex-direction: column;
  gap: .75rem;
}

.class-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.2rem;
  background: #131313;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: border-color 0.2s;
  gap: 1rem;
}

.class-tag:hover { border-color: rgba(200, 255, 0, 0.15); }
.class-card--booked { border-color: rgba(200, 255, 0, 0.2); }
.class-left { flex: 1; }

.class-tag {
  display: inline-block;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.2rem 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid transparent;
  transition: border-color 0.2s;
}

.class-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #f0ede6;
  margin-bottom: 0.3rem;
}

.class-meta {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.75rem;
  color: rgba(240, 237, 230, 0.5);
}

.class-meta span {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.class-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  flex-shrink: 0;
}

.class-time {
  font-size: 0.75rem;
  color: rgba(240, 237, 230, 0.5);
  white-space: nowrap;
  font-weight: 600;
}

.class-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.85rem;
  background: rgba(200, 255, 0, 0.1);
  border: 1px solid rgba(240, 237, 230, 0.3);
  color: #c8ff00;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: all 0.2s;
  cursor: pointer;
}

.class-btn:hover:not(:disabled) {
  background: rgba(200, 255, 0, 0.2);
}

.class-btn--booked {
  background: rgba(200, 255, 0, 0.06);
  border-color: rgba(200, 255, 0, 0.15);
  color: rgba(200, 255, 0, 0.5);
  cursor: default;
}

/* Activity */
.activity-list {
  display: flex;
  flex-direction: column;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.activity-item:last-child { border-bottom: none; }

.activity-icon-wrap {
  width: 36px;
  height: 36px;
  background: rgba(200, 255, 0, 0.08);
  display: grid;
  place-items: center;
  flex-shrink: 0;
  clip-path: polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%);
}

.activity-icon { font-size: 1rem !important; color: rgba(240, 237, 230, 0.4) !important; }
.activity-body { flex: 1; }

.activity-desc {
  font-size: 0.9rem;
  font-weight: 500;
  color: #f0ede6;
}

.activity-meta {
  font-size: 0.72rem;
  color: rgba(240, 237, 230, 0.5);
  margin-top: 0.2rem;
}

.activity-date {
  font-size: 0.72rem;
  color: rgba(240, 237, 230, 0.5);
  white-space: nowrap;
  flex-shrink: 0;
}

/* Bundle Panel */
.bundle-panel {
  border-color: rgba(200, 255, 0, 0.15);
  background: linear-gradient(135deg, #0f0f0f 0%, #111a00 100%);
}

.bundle-panel--warn {
  border-color: rgba(255, 170, 0, 0.25);
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1100 100%);
}

.bundle-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2.2rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #c8ff00;
  line-height: 1;
  margin: 0.4rem 0 0.8rem;
}

.bundle-name span { color: rgba(240, 237, 230, 0.4); font-size: 1.4rem; }
.bundle-detail {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: rgba(240, 237, 230, 0.5);
  margin-bottom: 0.5rem;
}

.bundle-bar-wrap {
  margin: 1.2rem 0 0.4rem;
}

.bundle-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.4rem;
}

.bundle-panel--warn .bundle-bar-fill { background: #ffaa00; }

.bundle-days {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(240, 237, 230, 0.5);
  letter-spacing: 0.08em;
}

.upgrade-btn {
  width: 100%;
  margin-top: 1.2rem;
  padding: 0.85rem;
  background: #c8ff00;
  border: none;
  color: #0a0a0a;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: background 0.2s, transform 0.15s;
  cursor: pointer;
  clip-path: polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%);
}

.upgrade-btn:hover { background: #d9ff33; transform: translateY(-1px); }
.bundle-panel--warn .upgrade-btn { background: #ffaa00; }

/* Quick Actions */
.actions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
}

.action-chip {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 0.9rem;
  background: #131313;
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: rgba(240, 237, 230, 0.65);
  font-size: 0.8rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
}

.action-chip:hover {
  border-color: rgba(200, 255, 0, 0.15);
  color: #f0ede6;
  background: #161616;
}

.action-icon { font-size: 1.1rem !important; color: #c8ff00 !important; flex-shrink: 0; }

/* Announcements */
.announcement-list { display: flex; flex-direction: column; gap: 0.9rem; }
.announcement-item {
  padding: 0.9rem 1rem;
  border-left: 3px solid transparent;
  transition: background 0.2s;
  background: #131313;
}

.announcement-item:hover { background: #161616; }

.ann-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}

.ann-icon { font-size: 1rem !important; flex-shrink: 0; }
.ann-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #f0ede6;
  line-height: 1;
  flex: 1;
}

.ann-date {
  font-size: 0.68rem;
  color: rgba(240, 237, 230, 0.5);
  white-space: nowrap;
}

.ann-body {
  font-size: 0.85rem;
  color: rgba(240, 237, 230, 0.5);
  line-height: 1.6;
}
</style>