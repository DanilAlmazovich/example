<template>
  <div class="tab-content-body dashboard profile">
    <div class="row">
      <div class="col">
        <h3>Настройки профиля</h3>
        <ProfileForm :ava="photo"/>
        <Addresses/>
      </div>
      <div class="float-right manage-banner">
        <img src="https://dummyimage.com/217x675/000/fff" alt="avatar" class="manage-banner-img">
      </div>
    </div>

  </div>
</template>

<script>
import ProfileForm from '@/components/dashboard/profile/ProfileForm';
import Addresses from '@/components/dashboard/addresses/Addresses';

export default {
  components: {
    Addresses,
    ProfileForm
  },
  props:{
    photo: null,
  }
}
</script>