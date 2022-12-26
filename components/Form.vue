<template>
  <div class="form-container">
    <div class="banner-desktop">
      <div class="steps">
        <div
          @click="store.step = 1"
          :class="{ step: true, active: store.step === 1 ? true : false }"
        >
          <div class="icon">1</div>
          <div class="info">
            <span class="number">STEP 1</span>
            <span class="title">YOUR INFO</span>
          </div>
        </div>
        <div
          @click="store.step1Complete ? (store.step = 2) : 0"
          :class="{ step: true, active: store.step === 2 ? true : false }"
        >
          <div class="icon">2</div>
          <div class="info">
            <span class="number">STEP 2</span>
            <span class="title">SELECT PLAN</span>
          </div>
        </div>
        <div
          @click="store.step1Complete && store.step2Complete ? (store.step = 3) : 0"
          :class="{ step: true, active: store.step === 3 ? true : false }"
        >
          <div class="icon">3</div>
          <div class="info">
            <span class="number">STEP 3</span>
            <span class="title">ADD-ONS</span>
          </div>
        </div>
        <div
          @click="store.step1Complete && store.step2Complete ? (store.step = 4) : 0"
          :class="{ step: true, active: store.step === 4 ? true : false }"
        >
          <div class="icon">4</div>
          <div class="info">
            <span class="number">STEP 4</span>
            <span class="title">SUMMARY</span>
          </div>
        </div>
      </div>
    </div>
    <div class="main-content">
      <Input />
      <div class="step-buttons">
        <button
          type="submit"
          @click="store.step--"
          :style="{
            visibility: store.step === 1 ? 'hidden' : 'visible',
          }"
          class="back"
        >
          Go Back
        </button>
        <button
          v-if="store.step !== 4"
          @click="store.step++"
          class="next"
          :disabled="
            (store.step === 1 && !store.step1Complete) ||
            (store.step === 2 && !store.step2Complete)
          "
        >
          Next Step
        </button>
        <button class="confirm" v-else>Confirm</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFormStore } from "~~/stores/FormStore";
import { ref } from "vue";

const store = useFormStore();
</script>

<style lang="scss" scoped>
div.form-container {
  box-sizing: border-box;
  background-color: white;
  min-width: 950px;
  // width: 100%;
  height: 600px;
  border-radius: 15px;
  box-shadow: rgba(3, 83, 255, 0.219) 0px 7px 20px -6px;
  display: flex;
  align-items: center;
  padding: 16px;

  & div.banner-desktop {
    box-sizing: border-box;
    background: url("~/assets/images/bg-sidebar-desktop.svg");
    height: 568px;
    min-width: 274px;
    color: white;
    display: flex;
    justify-content: center;
    padding: 50px 0;
    border-radius: 10px;

    & div.steps {
      display: flex;
      flex-direction: column;
      gap: 5px;

      & div.step {
        display: flex;
        gap: 10px;
        align-items: center;
        padding: 15px;
        border-radius: 8px;
        transition: background-color 0.2s ease-in-out;

        & div.icon {
          border: 1px solid var(--Light-blue);
          border-radius: 100px;
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
          line-height: 1px;
        }

        & div.info {
          display: flex;
          flex-direction: column;
          gap: 3px;

          & span.number {
            font-size: 0.8rem;
            opacity: 50%;
          }

          & span.title {
            font-weight: 500;
            letter-spacing: 1px;
            font-size: 0.9rem;
          }
        }

        &.active {
          & div.icon {
            background-color: var(--Light-blue);
            color: var(--Marine-blue);
          }
        }

        &:hover {
          cursor: pointer;
          background-color: rgba(255, 255, 255, 0.096);
        }
      }
    }
  }

  & div.main-content {
    box-sizing: border-box;
    color: var(--Marine-blue);
    // background-color: red;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-left: 16px;
    height: 100%;
    padding: 0 80px;
    // height: 100%;

    & div.step-buttons {
      display: flex;
      // background-color: blue;
      flex-grow: 1;
      justify-content: space-between;
      align-items: center;

      & button {
        all: unset;
        color: var(--Marine-blue);
        font-weight: 500;
        height: 50px;
        width: 120px;
        text-align: center;
        border-radius: 10px;
        line-height: 1px;
        transition: background-color 0.2s ease-in-out;

        &:hover {
          cursor: pointer;
        }

        &.next {
          color: white;
          background-color: var(--Marine-blue);

          &:hover {
            background-color: var(--Purplish-blue);
          }
        }

        &.back {
          &:hover {
            background-color: var(--Magnolia);
          }
        }

        &.confirm {
          background-color: var(--Purplish-blue);
          color: white;
          transition: box-shadow 0.2s ease-in-out, translate 0.2s ease-in-out;

          &:hover {
            translate: 0 -2px;
            box-shadow: var(--Pastel-blue) 0px 3px 8px 1px;
          }
        }

        &:disabled {
          cursor: not-allowed;
          opacity: 80%;

          &:hover {
            background-color: var(--Marine-blue);
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 992px) {
  div.main-content {
    // background-color: red;
    padding: 0 20px !important;
  }

  div.form-container {
    width: 800px !important;
    min-width: 800px !important;
  }

  div.banner-desktop {
    min-width: 260px !important;
  }
}

@media only screen and (max-width: 820px) {
  div.main-content {
    // background-color: red;
    padding: 0 5px !important;
  }

  div.form-container {
    width: 700px !important;
    min-width: 700px !important;
  }

  div.banner-desktop {
    min-width: 200px !important;
  }
}

@media only screen and (max-width: 718px) {
  div.banner-desktop {
    position: absolute;
    background: url('~/assets/images/bg-sidebar-mobile.svg') no-repeat center !important;
    background-size: cover !important;
    inset: 0;
    border-radius: 0 !important;
    height: 150px !important;

    & div.steps {
        flex-direction: row !important;
        gap: 10px !important;

        & span {
            display: none;
        }

        & div.step {
            padding: 0px !important;
            gap: 0 !important;
            height: 55px;
            width: 55px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}

  div.main-content {
    // background-color: red;
    padding: 20px 20px !important;
    margin: 0 !important;
  }

  div.form-container {
    width: 400px !important;
    min-width: 400px !important;
    height: fit-content;
    transition: 0.2 ease-in-out;
    margin: 200px 0 100px 0 !important;
  }

  div.banner-desktop {
    min-width: 200px !important;
  }

  div.step-buttons {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    padding: 20px;
  }
}
</style>
