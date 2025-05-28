<script lang="ts">
import type { Location } from '$lib/interfaces/locationInterface';
    

    let name = "모두의 AI";
    let description = "ai 산업에 대한 연구와 관련 아이템 컨설팅을 제공합니다. 기업들이 사업에 ai를 활용하여 생산성을 늘리고 이익을 극대화할 수 있도록 돕습니다.";
    let industry = "IT, AI, 인공지능";
    
    const locations: Array<Location> = [
        {
            name: "강남역",
            latitude: 37.497942,
            longitude: 127.027621
        },
        {
            name: "성수역",
            latitude: 37.544627,
            longitude: 127.055278
        },
        {
            name: "을지로입구역",
            latitude: 37.566014,
            longitude: 126.982617
        }
    ];

    let selectedLocation: Location = locations[0];

    const requestLeadRecommendation = async () => {
        const response = await fetch('/webapp/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                description,
                industry,
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude
            })
        });

        const data = await response.json();

        console.log(data);
    }
</script>

<div class="wrapper">
    <h1 class="font-display">Peak Connect</h1>
    <img src="https://imagedelivery.net/goza06089fZJqNysJE56Uw/d7a83d99-42d1-4484-b4d5-dfc4594c7600/w=500" alt="peak connect logo">
    <p class="font-body">회사명 입력</p>
    <input type="text" bind:value={name} />
    
    <p class="font-body">회사 설명 입력</p>
    <textarea bind:value={description} placeholder="회사 설명을 입력해주세요. 제공하는 서비스나 관련 분야 등을 자유롭게 입력해주세요. 입력하신 정보를 기반으로 리드를 추천해드립니다." ></textarea>
    
    <p class="font-body">산업군 입력</p>
    <input type="text" bind:value={industry} placeholder="산업군을 입력해주세요. 복수 응답 시 쉼표로 구분." />

    <p class="font-body">지역 선택</p>
    <select name="location-selector font-body" aria-label="Select your location" bind:value={selectedLocation}>
        {#each locations as item}
            <option value={item}>{item.name}</option>
        {/each}
    </select>

    <button class="font-title confirm-btn" on:click={requestLeadRecommendation}>리드 추천</button>
</div>


<style>
    .wrapper {
        width: 100%;
        height: 100%;
        max-width: 500px;
        margin: 0 auto;
        padding: 20px;
        background-color: #1a1a1a;
        padding-top: 40px;
    }
    h1 {
        position: absolute;
        top: -100px;
    }

    img {
        width: 100%;
        max-width: 100%;
        margin-bottom: 40px;
    }

    p {
        color: white;
        margin-bottom: 8px;
    }

    input {
        background-color: #272727;
        border: none;
        color: white;
        margin-bottom: 40px;
    }

    textarea {
        background-color: #272727;
        border: none;
        color: white;
        margin-bottom: 40px;
        resize: none;
        height: 300px;
    }

    .location-btn {
        background-color: var(--color-main);
        color: white;
        border: none;
        cursor: pointer;
        width: 100%;
        margin-top: 32px;
    }

    .confirm-btn {
        background-color: var(--color-main);
        color: white;
        border: none;
        cursor: pointer;
        width: 100%;
        margin-top: 32px;
    }
</style>