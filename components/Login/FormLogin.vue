<template>
  <form class="mt-[44px] mx-6" @submit.prevent="onFormSubmit">
    <div class="mb-4">
      <label for="E-mail" class="block mb-2 text-sm text-gray-800"
        >E-mail</label
      >
      <div class="flex">
        <span
          class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md"
          :class="{ 'is-invalid': eEmail.length }"
        >
          <IconSvg
            class="w-5 h-5 mb-1 stroke-current"
            icon="/icons/common/email.svg"
            :size="20"
            fillColor="#616161"
          />
        </span>
        <input
          type="text"
          id="E-mail"
          v-model="fields.email"
          class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
          placeholder="Contoh: agus.permadi@gmail.com"
          :disabled="processed"
        />
      </div>
      <div class="text-red-500 text-sm">
        <div v-for="(msg, i) in eEmail" :key="i">{{ msg }}</div>
      </div>

      <label for="password" class="block mb-2 text-sm text-gray-800 mt-4"
        >Password</label
      >
      <div class="flex">
        <span
          class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md"
          :class="{ 'is-invalid': ePassword.length }"
        >
          <IconSvg
            class="w-5 h-5 mb-1 stroke-current"
            icon="/icons/common/key.svg"
            :size="20"
            fillColor="#616161"
          />
        </span>
        <input
          v-model="fields.password"
          type="password"
          id="password"
          class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
          placeholder="Masukan kata sandi anda"
          :disabled="processed"
        />
      </div>
      <div class="text-red-500 text-sm">
        <div v-for="(msg, i) in ePassword" :key="i">{{ msg }}</div>
      </div>
    </div>

    <button
      class="bg-green-600 text-white hover:bg-green-700 h-fit w-full rounded-lg py-[10px] px-[16px] text-[14px] font-bold mt-3"
      type="submit"
      :disabled="processed"
    >
      <div
        class="flex justify-center items-center text-[14px] font-lato font-bold"
      >
        <div
        v-if="processed"
          class="w-5 h-5 rounded-full animate-spin border-4 border-dashed border-blue-500 border-t-transparent text-center mr-3"
        ></div>
        Login Akun
      </div>
    </button>
  </form>
</template>

<script setup>
import { required, helpers, email } from "@vuelidate/validators";

const emit = defineEmits(["success", "failed"]);
const processed = ref(false);
const fields = reactive({
  email: null,
  password: null,
});

const v$ = useValidator(
  {
    email: {
      required: helpers.withMessage(
        "This value should not be blank.",
        required
      ),
      email: helpers.withMessage("Please enter a valid email address.", email),
    },
    password: {
      required: helpers.withMessage(
        "This value should not be blank.",
        required
      ),
    },
  },
  fields
);

const eEmail = computed(() => v$.getError("email"));
const ePassword = computed(() => v$.getError("password"));

async function onFormSubmit() {
  const isValid = await v$.validator.$validate();
  if (processed.value || !isValid) {
    return;
  }

  processed.value = true;
  v$.reset();

  try {
    // const response = await httpPost("/admin/login/validate", {
    //   username: fields.username,
    //   password: fields.password,
    // });
    // const payload = response.data.payload;
    // if (isRoleGranted(payload.account.roles, [ROLE_ADMIN])) {
    emit("success");
    // } else {
    //   emit("failed", {
    //     errorCode: "login.invalid_credentials",
    //     message: "Invalid username or password.",
    //   });
    // }
  } catch (e) {
    emit("failed");
    // if (isHttpErrorCode("validation.client_field_error", e)) {
    //   v$.setViolations(e.response.data.messages);
    // } else {
    //   const { message, errorCode } = httpErrorParse(e);
    //   emit("failed", { message, errorCode });
    // }
  }

  processed.value = false;
}
</script>
