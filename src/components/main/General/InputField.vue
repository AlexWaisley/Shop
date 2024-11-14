<script setup lang="ts">
const props = defineProps<{
    placeholder: string,
    type: string
}>();

const inputText = defineModel({ required: true });
</script>
<template>
    <div class="group">
        <input required="true" :type="props.type" v-model="inputText" class="s-input">
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>{{ props.placeholder }}</label>
    </div>
</template>
<style scoped lang="scss">
.group {
    position: relative;

    & .s-input {
        font-size: 16px;
        padding: 10px 10px 10px 5px;
        display: block;
        width: 100%;
        border: none;
        border-bottom: 1px solid #515151;
        background: transparent;

        &:focus {
            outline: none;
        }

        &:focus~label,
        &:valid~label {
            top: -20px;
            font-size: 14px;
            color: #5264AE;
        }

        &:focus~.bar:before,
        &:focus~.bar:after {
            width: 50%;
        }

        &:focus~.highlight {
            animation: inputHighlighter 0.3s ease;
        }
    }

    & label {
        color: #999;
        font-size: 18px;
        font-weight: normal;
        position: absolute;
        pointer-events: none;
        left: 5px;
        top: 10px;
        transition: 0.2s ease all;
    }

    & .bar {
        position: relative;
        display: block;
        width: 100%;

        &:before,
        &:after {
            content: '';
            height: 2px;
            width: 0;
            bottom: 1px;
            position: absolute;
            background: #5264AE;
            transition: 0.2s ease all;
        }

        &:before {
            left: 50%;
        }

        &:after {
            right: 50%;
        }
    }

    & .highlight {
        position: absolute;
        height: 60%;
        width: 100px;
        top: 25%;
        left: 0;
        pointer-events: none;
        opacity: 0.5;
    }
}



@keyframes inputHighlighter {
    from {
        background: #5264AE;
    }

    to {
        width: 0;
        background: transparent;
    }
}
</style>