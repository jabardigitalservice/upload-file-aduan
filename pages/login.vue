<template>
  <div class="bg-[#E5E5E5] min-h-screen">
    <div class="flex justify-center items-center h-screen">
      <div
        class="h-fit w-[470px] bg-white border border-[#EAEAEF] rounded-lg drop-shadow-md py-[40px] px-[24px]"
      >
        <div class="container mx-auto">
          <LoginHeader />
          <LoginFormLogin @success="onSuccess"  @failed="onFailed" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
    function onSuccess(payload) {
        console.log('success')
    }

    function onFailed(error) {
        console.log('error')
    }

 
</script>
