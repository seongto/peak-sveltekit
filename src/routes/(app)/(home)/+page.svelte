<script lang="ts">
    import type { Location } from '$lib/interfaces/location-interfaces';
    import type { NewLead } from '$lib/interfaces/lead-interfaces';

    
    let name = $state("");
    let description = $state("");
    
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
        },
        {
            name: "홍대입구역",
            latitude: 37.556944,
            longitude: 126.923917
        }
    ];

    let selectedLocation: Location = $state(locations[0]);

    let isLoading = $state(false);
    let leads: Array<NewLead> = $state([]);

    const requestLeadRecommendation = async () => {
        isLoading = true;
        leads = [];

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

        const result = await response.json();
        isLoading = false;

        leads = result.data.leads;
    }
</script>

<div class="wrapper">
    <h1 class="font-display">Peak Connect</h1>
    <img src="https://imagedelivery.net/goza06089fZJqNysJE56Uw/d7a83d99-42d1-4484-b4d5-dfc4594c7600/w=500" alt="peak connect logo">
    <p class="font-body">회사명 입력</p>
    <input type="text" bind:value={name} />
    
    <p class="font-body">회사 설명 입력</p>
    <textarea bind:value={description} placeholder="회사 설명을 입력해주세요. 제공하는 서비스나 관련 분야 등을 자유롭게 입력해주세요. 비즈니스에 필요한 협업포인트도 좋습니다. 입력하신 정보를 기반으로 리드를 추천해드립니다." ></textarea>

    <p class="font-body">지역 선택</p>
    <select name="location-selector font-body" aria-label="Select your location" bind:value={selectedLocation}>
        {#each locations as item}
            <option value={item}>{item.name}</option>
        {/each}
    </select>

    {#if !isLoading}
        <button class="font-title confirm-btn" onclick={requestLeadRecommendation}>리드 추천</button>
    {:else}
        <button class="font-title confirm-btn" disabled>리드 추천 중...</button>
    {/if}

    <ul class="leads">
        {#each leads as item (item)}
            <li>
                <h3 class="font-h3 font-bold name">{item.name}</h3>
                <p class="font-body summary">{item.summary}</p>
                <p class="font-body item-label font-bold">CEO</p>
                <p class="font-body item-value">{item.ceo_name}</p>
                <p class="font-body item-label font-bold">산업군</p>
                <p class="font-body item-value">{item.industry}</p>
                <p class="font-body item-label font-bold">설립 연도</p>
                <p class="font-body item-value">{item.year_founded}</p>
                <p class="font-body item-label font-bold">주소</p>
                <p class="font-body item-value">{item.address}</p>
                <p class="font-body item-label font-bold">웹사이트</p>
                <a href={item.website} target="_blank" class="font-body item-value">{item.website}</a>
                <p class="font-body item-label font-bold">추천 이유</p>
                <p class="font-body item-value">{item.match_reason}</p>
            </li>
        {/each}
    </ul>
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

    select {
        background-color: #3b3b3b;
        border: none;
        color: white;
    }

    .confirm-btn {
        background-color: var(--color-main);
        color: white;
        border: none;
        cursor: pointer;
        width: 100%;
        margin: 32px 0 60px;
    }

    .leads {

        & li {
            padding: 20px;
            background-color: #272727;
            border-radius: 8px;
            margin-bottom: 20px;

            .name {
                color: white;
                margin-bottom: 20px;
            }

            .summary {
                color: #bbbbbb;
                margin-bottom: 20px;
                padding-bottom: 20px;
                border-bottom: 1px solid #6e6e6e;
            }

            .item-label {
                color: var(--color-sub1);
                margin-bottom: 4px;
            }

            .item-value {
                color: #bbbbbb;
                margin-bottom: 20px;
            }

            a {
                color: white;
                display: block;
            }
        }
    }
</style>