<script lang="ts">
import type { Location } from '$lib/interfaces/location-interfaces';
    
    let name = "모두의 책방";
    let description = "누구나 쉽게 자신만의 책방을 만들어 운영할 수 있는 플랫폼입니다. ai를 활용하여 책방을 운영하는 사람들에게 도움을 드리고자 합니다.";
    
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

    let isLoading = false;

    const requestLeadRecommendation = async () => {
        isLoading = true;
        const response = await fetch('/webapp/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                description,
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude
            })
        });

        const data = await response.json();
        isLoading = false;

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

    <p class="font-body">지역 선택</p>
    <select name="location-selector font-body" aria-label="Select your location" bind:value={selectedLocation}>
        {#each locations as item}
            <option value={item}>{item.name}</option>
        {/each}
    </select>

    {#if !isLoading}
        <button class="font-title confirm-btn" on:click={requestLeadRecommendation}>리드 추천</button>
    {:else}
        <button class="font-title confirm-btn" disabled>리드 추천 중...</button>
    {/if}
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