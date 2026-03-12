<script setup>
import "leaflet/dist/leaflet.css"
import * as L from 'leaflet';
import { ref, onMounted } from 'vue';

const cbdMap = ref(null);
const kilimaniMap = ref(null);
const westlandsMap = ref(null);

onMounted(() => {
    // CBD
    cbdMap.value = L.map('map-cbd').setView([-1.2953145569779758, 36.817184449599566], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(cbdMap.value);
    L.marker([-1.3073328374609299, 36.81211146039793]).addTo(cbdMap.value);

    // Kilimani
    kilimaniMap.value = L.map('map-kilimani').setView([-1.2921, 36.7762], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(kilimaniMap.value);
    L.marker([-1.2921, 36.7762]).addTo(kilimaniMap.value);

    // Westlands
    westlandsMap.value = L.map('map-westlands').setView([-1.2382, 36.8046], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(westlandsMap.value);
    L.marker([-1.2382, 36.8046]).addTo(westlandsMap.value);
});

</script>

<template>
    <v-container class="mt-12">
        <v-row>
            <v-col>
                <div class="text-display-medium">Our Locations</div>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-row>
                        <v-col md="4">
                            <v-card-text> CBD </v-card-text>
                        </v-col>
                        <v-col md="8">
                            <div id="map-cbd" style="height:30vh;"></div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-row>
                        <v-col md="4">
                            <v-card-text> Kilimani </v-card-text>
                        </v-col>
                        <v-col md="8">
                            <div id="map-kilimani" style="height:30vh;"></div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-row>
                        <v-col md="4">
                            <v-card-text> Westlands </v-card-text>
                        </v-col>
                        <v-col md="8">
                            <div id="map-westlands" style="height:30vh;"></div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row> 
    </v-container>
</template>