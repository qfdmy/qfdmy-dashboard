<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.value" clearable style="width: 300px; margin-right: 10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增
      </el-button>
    </div>

    <el-table v-loading="loading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column width="180px" align="center" label="创建时间">
        <template slot-scope="{row}">
          <span>{{ row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" label="账号">
        <template slot-scope="{row}">
          <router-link :to="'/users/admin/edit/'+row.id" class="link-type">
            <span>{{ row.username }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column width="120px" label="昵称">
        <template slot-scope="{row}">
          <span>{{ row.nickname }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" label="邮箱">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="230">
        <template slot-scope="{row, $index}">
          <router-link :to="'/users/admin/edit/'+row.id" style="margin-right: 10px;">
            <el-button type="primary" size="small">
              编辑
            </el-button>
          </router-link>
          <el-button type="danger" size="small" @click="removeData(row, $index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList, remove } from '@/api/coreAdmin'
import Pagination from '@/components/Pagination'

export default {
  name: 'CoreAdminList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'info'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      total: 0,
      list: null,
      loading: true,
      listQuery: {
        current: 1,
        size: 10,
        value: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.loading = false
      })
    },

    handleFilter() {
      this.loading = true
      this.listQuery.current = 1
      this.getList()
    },

    handleCreate() {
      this.$router.push('/users/admin/create')
    },

    removeData(row, index) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        remove(row.id).then(response => {
          this.$notify({
            title: '温馨提示',
            message: response.message,
            type: 'warning',
            duration: 3000
          })
          this.loading = false
          // 删除数组，从第索引行开始，删除 1 行
          this.list.splice(index, 1)
        }, error => {
          if (error) {
            this.loading = false
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
