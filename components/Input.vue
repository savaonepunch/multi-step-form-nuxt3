<template>
    <div class="input-container">
        <Transition mode="out-in">
            <div v-if="store.step === 1" class="personal-info">
                <h1>Personal Info</h1>
                <p>Please provide your name, email address, and phone number.</p>
                <form @keyup.enter="store.step1Complete ? store.step++ : 0" type="submit">
                    <div :class="{ 'input': true, 'empty': name === '' }">
                        <label for="name">Name</label>
                        <input v-model="name" type="text" id="name" placeholder="e.g. John Doe">
                    </div>
                    <div :class="{ 'input': true, 'empty': email === '' }">
                        <label for="email">Email Address</label>
                        <input v-model="email" type="email" id="email" placeholder="e.g. johndoe@gmail.com">
                    </div>
                    <div :class="{ 'input': true, 'empty': phone === '' }">
                        <label for="phone">Phone Number</label>
                        <input v-model="phone" type="text" id="phone" placeholder="e.g. +1 234 567 890">
                    </div>
                </form>
            </div>
            <div v-else-if="store.step === 2" class="select-plan">
                <h1>Select your plan</h1>
                <p>You have the option of monthly or yearly billing.</p>
                <div :class="{ cards: true, yearly: store.yearly }">
                    <div @click="store.plan = 'arcade'"
                        :class="{ 'card': true, 'selected': store.plan === 'arcade' ? true : false }">
                        <img src="~/assets/images/icon-arcade.svg" alt="Arcade Icon">
                        <h3>Arcade</h3>
                        <p>{{ store.yearly ? '$90/yr' : '$9/mo' }}</p>
                        <p class="free">2 months free</p>
                    </div>
                    <div @click="store.plan = 'advanced'"
                        :class="{ 'card': true, 'selected': store.plan === 'advanced' ? true : false }">
                        <img src="~/assets/images/icon-advanced.svg" alt="Arcade Icon">
                        <h3>Advanced</h3>
                        <p>{{ store.yearly ? '$120/yr' : '$12/mo' }}</p>
                        <p class="free">2 months free</p>

                    </div>
                    <div @click="store.plan = 'pro'"
                        :class="{ 'card': true, 'selected': store.plan === 'pro' ? true : false }">
                        <img src="~/assets/images/icon-pro.svg" alt="Arcade Icon">
                        <h3>Pro</h3>
                        <p>{{ store.yearly ? '$150/yr' : '$15/mo' }}</p>
                        <p class="free">2 months free</p>

                    </div>
                </div>
                <div class="pricing-toggle">
                    <h4 :style="{ color: store.yearly ? 'var(--Cool-gray)' : 'var(--Marine-blue)' }" class="monthly">
                        Monthly</h4>
                    <div @click="store.yearly = !store.yearly"
                        :class="{ 'toggle-container': true, 'yearly': store.yearly }">
                        <div class="toggle-circle">
                        </div>
                    </div>
                    <h4 :style="{ color: store.yearly ? 'var(--Marine-blue)' : 'var(--Cool-gray)' }" class="">Yearly
                    </h4>
                </div>
            </div>
            <div v-else-if="store.step === 3" class="pick-addons">
                <h1>Pick add-ons</h1>
                <p>Add-ons help enhance your gaming experience.</p>

                <div class="addons">
                    <div @click="store.addons.includes('online') ? store.addons = store.addons.filter(addon => addon !== 'online') : store.addons.push('online')"
                        :class="{ 'addon': true, 'checked': store.addons.includes('online') }">
                        <div class="checkbox">
                            <Icon name="uil:check"></Icon>
                        </div>
                        <div class="info">
                            <span class="title">Online service</span>
                            <span class="description">Access to multiplayer games</span>
                        </div>
                        <span class="price">
                            {{ store.yearly ? '+$10/yr' : '+$1/mo' }}
                        </span>
                    </div>
                    <div @click="store.addons.includes('storage') ? store.addons = store.addons.filter(addon => addon !== 'storage') : store.addons.push('storage')"
                        :class="{ 'addon': true, 'checked': store.addons.includes('storage') }">
                        <div class="checkbox">
                            <Icon name="uil:check"></Icon>
                        </div>
                        <div class="info">
                            <span class="title">Larger storage</span>
                            <span class="description">Extra 1TB of cloud save</span>
                        </div>
                        <span class="price">
                            {{ store.yearly ? '+$20/yr' : '+$2/mo' }}

                        </span>
                    </div>
                    <div @click="store.addons.includes('profile') ? store.addons = store.addons.filter(addon => addon !== 'profile') : store.addons.push('profile')"
                        :class="{ 'addon': true, 'checked': store.addons.includes('profile') }">
                        <div class="checkbox">
                            <Icon name="uil:check"></Icon>
                        </div>
                        <div class="info">
                            <span class="title">Customizable Profile</span>
                            <span class="description">Custom theme on your profile</span>
                        </div>
                        <span class="price">
                            {{ store.yearly ? '+$20/yr' : '+$2/mo' }}
                        </span>
                    </div>
                </div>

            </div>
            <div v-else-if="store.step === 4" class="summary">
                <h1>Finishing up</h1>
                <p>Double-check everything looks OK before continuing.</p>
                <div class="info-container">
                    <div class="options">
                        <div class="plan">
                            <div class="info">
                                <h4>{{ plan }}</h4>
                                <p @click="store.step = 2" class="change">Change</p>
                            </div>
                            <h4 v-if="store.plan === 'arcade'" class="price">{{ store.yearly ? '$90/yr' : '$9/mo' }}
                            </h4>
                            <h4 v-else-if="store.plan === 'advanced'" class="price">{{ store.yearly ? '$120/yr' :
        '$12/mo'
}}</h4>
                            <h4 v-if="store.plan === 'pro'" class="price">{{ store.yearly ? '$150/yr' : '$15/mo' }}</h4>
                        </div>
                        <div v-if="store.addons.length" class="addons">
                            <div class="addon" v-if="store.addons.includes('online')">
                                <span class="title">Online service</span>
                                <span class="price">{{ store.yearly ? '+10/yr' : '+1/mo' }}</span>
                            </div>
                            <div class="addon" v-if="store.addons.includes('storage')">
                                <span class="title">Larger storage</span>
                                <span class="price">{{ store.yearly ? '+20/yr' : '+2/mo' }}</span>
                            </div>
                            <div class="addon" v-if="store.addons.includes('profile')">
                                <span class="title">Customizable Profile</span>
                                <span class="price">{{ store.yearly ? '+20/yr' : '+2/mo' }}</span>
                            </div>
                        </div>
                        <div v-else class="addons">
                            <p>No extra options added</p>
                        </div>
                    </div>

                    <div class="price-container">
                        <span class="price-info">{{ store.yearly ? 'Total (per year)' : 'Total (per month)'
}}</span>
                        <span class="price">{{ store.yearly ? `$${store.totalPrice}/yr` : `$${store.totalPrice}/mo`
                            }}</span>
                    </div>

                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { useFormStore } from '~~/stores/FormStore';

const store = useFormStore();

const name = ref(store.name);
const email = ref(store.email);
const phone = ref(store.phone);

const plan = computed(() => {
    if (store.plan === 'arcade') return `Arcade (${store.yearly ? 'Yearly' : 'Monthly'})`;
    else if (store.plan === 'advanced') return `Advanced (${store.yearly ? 'Yearly' : 'Monthly'})`;
    if (store.plan === 'pro') return `Pro (${store.yearly ? 'Yearly' : 'Monthly'})`;
})

watch([name, email, phone], () => {
    store.name = name.value;
    store.email = email.value;
    store.phone = phone.value;
})

</script>

<style lang="scss" scoped>
div.input-container {
    display: flex;
    height: 85%;

    & h1 {
        margin-top: 46px;
        margin-bottom: 0px;
    }

    & p {
        opacity: 60%;
        margin-top: 10px;
    }

    & div.personal-info {
        & form {
            margin-top: 50px;
            display: flex;
            flex-direction: column;
            gap: 20px;

            & div.input {
                display: flex;
                flex-direction: column;
                gap: 8px;

                & label {
                    opacity: 90%;
                    font-size: .9rem;
                    position: relative;


                }

                & input {
                    border: 1px solid var(--Light-gray);
                    border-radius: 5px;
                    padding: 12px;
                    outline-color: var(--Purplish-blue);
                }

                &.empty {

                    & input {
                        outline-color: red;
                        outline-width: 2px;
                        outline-style: solid;
                    }

                    & label {
                        &::after {
                            content: 'This field is required';
                            color: red;
                            position: absolute;
                            top: 0px;
                            right: 0px;
                        }
                    }
                }
            }
        }
    }

    & div.select-plan {
        width: 100%;

        & div.pricing-toggle {
            display: flex;
            justify-content: center;
            gap: 25px;
            align-items: center;
            background-color: var(--Magnolia);
            border-radius: 8px;

            & h4 {
                transition: color .2s ease-in-out;
                font-weight: 500;
            }

            & div.toggle-container {
                width: 45px;
                height: 18px;
                background-color: var(--Marine-blue);
                border-radius: 25px;
                display: flex;
                align-items: center;
                padding: 5px;

                & div.toggle-circle {
                    margin-left: initial;
                    height: 100%;
                    width: 18px;
                    background-color: white;
                    border-radius: 25px;
                    transition: .2s ease-in-out;
                }

                &:hover {
                    cursor: pointer;
                }

                &.yearly {
                    & div.toggle-circle {
                        margin-left: 60%;
                    }
                }
            }
        }

        & div.cards {
            margin-top: 40px;
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
            gap: 10px;

            & div.card {
                box-sizing: border-box;
                padding: 15px;
                height: 150px;
                width: 140px;
                border-radius: 8px;
                border: 1px solid var(--Light-gray);
                transition: border-color .2s ease-in-out, background-color .2s ease-in-out, height .2s ease-in-out;
                overflow: hidden;

                & p {
                    margin: 3px;
                    transition: opacity .2s ease-in-out;

                    &.free {
                        opacity: 0;
                    }
                }

                &:hover {
                    cursor: pointer;
                    border-color: var(--Purplish-blue);
                }

                &.selected {
                    background-color: var(--Magnolia);
                    border-color: var(--Purplish-blue);
                }
            }

            &.yearly {
                & div.card {
                    height: 170px;

                    & p.free {
                        opacity: 100%;
                    }
                }
            }
        }
    }

    & div.pick-addons {
        width: 100%;
        display: flex;
        flex-direction: column;

        & div.addons {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-top: 15px;

            & div.addon {
                border: 1px solid var(--Light-gray);
                border-radius: 8px;
                display: flex;
                padding: 25px 20px;
                align-items: center;

                & div.checkbox {
                    color: white;
                    background-color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 22px;
                    width: 22px;
                    font-size: 1.4rem;
                    border-radius: 3px;
                    border: 1px solid var(--Light-gray);
                    transition: border-color .2s ease-in-out, background-color .2s ease-in-out;
                }

                & div.info {
                    display: flex;
                    flex-direction: column;
                    margin-left: 20px;
                    gap: 5px;

                    & span.title {
                        font-weight: 600;
                    }

                    & span.description {
                        opacity: 80%;
                        font-size: .9rem;
                    }
                }

                & span.price {
                    margin-left: auto;
                    color: var(--Purplish-blue);
                    font-weight: 500;
                    font-size: .95rem;
                }

                transition: border-color .2s ease-in-out,
                background-color .2s ease-in-out;

                &:hover {
                    cursor: pointer;
                    border: 1px solid var(--Purplish-blue);
                }

                &.checked {
                    background-color: var(--Magnolia);
                    border-color: var(--Purplish-blue);

                    & div.checkbox {
                        background-color: var(--Purplish-blue);
                        border-color: var(--Purplish-blue);
                    }
                }
            }
        }
    }

    & div.summary {
        display: flex;
        flex-direction: column;
        width: 100%;

        & div.options {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background-color: var(--Magnolia);
            padding: 25px;
            margin-bottom: 10px;
            border-radius: 10px;
            margin-top: 25px;

            & div.plan {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;

                & div.info {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

                & p.change {
                    text-decoration: underline;

                    &:hover {
                        cursor: pointer;
                    }
                }

                padding-bottom: 25px;
                border-bottom: 1px solid var(--Light-gray);
            }

            & div.addons {
                display: flex;
                flex-direction: column;
                gap: 10px;

                & p {
                    margin: 0;
                }

                & div.addon {
                    display: flex;
                    justify-content: space-between;

                    & span.title {
                        opacity: 60%;
                    }

                    & span.price {
                        font-weight: 500;
                        font-size: .95rem;
                    }
                }
            }

            & p {
                margin: 0px;
            }

            & h4 {
                margin: 0;
            }
        }

        & div.price-container {
            display: flex;
            justify-content: space-between;
            background-color: var(--Magnolia);
            padding: 25px;
            border-radius: 10px;

            & span.price-info {
                opacity: 80%;
            }

            & span.price {
                font-weight: 600;
                font-size: 1.2rem;
                color: var(--Purplish-blue);
            }
        }
    }
}

@media only screen and (max-width: 718px) {
    h1 {
        margin-top: 0 !important;
    }

    div.cards {
        flex-direction: column;

        & div.card {
            width: 100% !important;
            display: flex;
            height: 80px !important;
            position: relative;
            flex-direction: column;
            padding-left: 80px !important;
            
            & h3 {
                margin: 0;
            }
        }

        & img {
            width: 40px;
            position: absolute;
            left: 20px;
            translate: 0 -50%;
            top: 50%;
        }

        &.yearly {
            & div.card {
                height: 105px !important;
            }
        }
    }
}

// Transitions
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>