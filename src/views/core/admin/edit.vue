<template>
  <core-admin-detail :is-edit="true" />
</template>

<script>
import CoreAdminDetail from './components/CoreAdminDetail'

export default {
  name: 'CoreAdminEdit',
  components: { CoreAdminDetail }
}
</script>
