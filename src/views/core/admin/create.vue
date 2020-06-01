<template>
  <core-admin-detail :is-edit="false" />
</template>

<script>
import CoreAdminDetail from './components/CoreAdminDetail'

export default {
  name: 'CoreAdminCreate',
  components: { CoreAdminDetail }
}
</script>
