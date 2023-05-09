import { defineComponent, onMounted, ref } from 'vue'
import { usePlacesStore } from '../../composables'
import mapboxgl from 'mapbox-gl'

export default defineComponent({
    name: 'MapView',
    setup() {
        const mapElement= ref<HTMLDivElement>()
        const { userLocation, isUserlocationReady } = usePlacesStore()
        const initMap = () => {
            if(!mapElement.value) return;
            if(!userLocation.value) return

            new mapboxgl.Map({
                container: mapElement.value, // container ID
                style: 'mapbox://styles/mapbox/streets-v12', // style URL
                center: userLocation.value, // starting position [lng, lat]
                zoom: 15, // starting zoom
            })
        }
        
        onMounted(() => {
            if(isUserlocationReady) return initMap()
            console.log('No se ha cargado la localizacion aun')
        })

        return {
            isUserlocationReady,
            userLocation,
            mapElement
        }
    }
})