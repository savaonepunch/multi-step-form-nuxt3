export const useFormStore = defineStore(
  "form",
  () => {
    const step = ref(1);
    const name = ref(null);
    const email = ref(null);
    const phone = ref(null);
    const plan = ref(null);
    const yearly = ref(false);
    const onlineAddonPrice = computed(() =>
      addons.value.includes("online") ? 1 : 0
    );
    const storageAddonPrice = computed(() =>
      addons.value.includes("storage") ? 2 : 0
    );
    const profileAddonPrice = computed(() =>
      addons.value.includes("profile") ? 2 : 0
    );
    const addons = ref<Array<String>>([]);
    const step1Complete = computed(() => {
      return name.value && email.value && phone.value ? true : false;
    });
    const step2Complete = computed(() => plan.value !== null);
    const totalPrice = computed(() => {
      let planPrice = 0;
      if (plan.value === "arcade") planPrice = 9;
      else if (plan.value === "advanced") planPrice = 12;
      else if (plan.value === "pro") planPrice = 15;
      if (yearly.value)
        return (
          (planPrice +
            onlineAddonPrice.value +
            storageAddonPrice.value +
            profileAddonPrice.value) *
          10
        );
      else
        return (
          planPrice +
          onlineAddonPrice.value +
          storageAddonPrice.value +
          profileAddonPrice.value
        );
    });

    return {
      totalPrice,
      onlineAddonPrice,
      storageAddonPrice,
      profileAddonPrice,
      step,
      name,
      email,
      phone,
      plan,
      step1Complete,
      step2Complete,
      yearly,
      addons,
    };
  },
  { persist: true }
);
