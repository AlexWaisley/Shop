<script setup lang="ts">

</script>

<template>
    <div class="bottom-container">
        <div class="bottom">
            <div class="section">
                <div class="info">
                    <div class="tag"><span class="text-large-bold">Contact</span></div>
                    <div class="content">
                        <span class="text-standart-bold">+7 (852) 852-85-28 </span>
                        <span class="text-standart-bold">+7 (852) 852-85-28</span>
                        <span class="text-standart-bold">+7 (852) 852-85-28</span>
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="info">
                    <div class="tag"><span class="text-large-bold">Address</span></div>
                    <div class="content">
                        <span class="text-standart-bold">ул. Николаевская (Короленко), 6</span>
                        <span class="text-standart-bold">просп. Независимости, 5</span>
                        <span class="text-standart-bold">ул. Алчевских, 36</span>
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="info">
                    <div class="tag"><span class="text-large-bold">Working hours</span></div>
                    <div class="content">
                        <table class="work-hours-table">
                            <tbody>
                                <tr>
                                    <td class="day">Mon-Sat</td>
                                    <td>9:00 - 20:00</td>
                                </tr>
                                <tr>
                                    <td class="day">Sun</td>
                                    <td>9:00 - 18:00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="rights">
            <span class="rights-reserved">© ak.la 2004-2024. All Rights Reserved.</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.bottom-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: skyblue;
    gap: 15px;


    & .bottom {
        display: flex;
        padding: 15px;
        gap: 15px;
        justify-content: space-around;

        & .section {
            display: flex;

            & .info {
                display: flex;
                flex-direction: column;
                gap: 15px;

                & .tag {
                    span {
                        display: block;
                        height: 50px;
                    }
                }

                & .content {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;

                    & .work-hours-table {
                        border-spacing: 15px;

                        & tbody>tr>.day {
                            padding: 7px;
                            border-right: 1px solid gray;
                        }
                    }
                }
            }
        }
    }

    & .rights {
        display: flex;
        justify-content: center;
        width: 100%;

        & .reserved {}
    }
}
</style>
