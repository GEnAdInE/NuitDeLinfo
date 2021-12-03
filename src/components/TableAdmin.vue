<template>
  <div class="tableadmin">
    <table class="tableadmin__table">
      <tr class="tableadmin__tr">
        <th class="tableadmin__th">Type</th>
        <th class="tableadmin__th">Titre</th>
        <th class="tableadmin__th">Date</th>
        <th class="tableadmin__th">Sauveteurs</th>
      </tr>
      <tr v-bind:key="pending" v-for="pending in pendings" class="tableadmin__tr">
        <td :class="'tableadmin__td '+pending.IsNewArticle?'__false':'__true'"></td>
        <td class="tableadmin__td">
          <a v-bind:href="'/article/'+pending.ID">{{pending.Titre}}</a>
        </td>
        <td class="tableadmin__td">{{pending.Date}}</td>
        <td class="tableadmin__td">{{pending.Sauveteurs}}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {
  doc, query, collection, getDocs, getFirestore, Timestamp,
} from 'firebase/firestore';
import { getAllPending, Pending } from '@/utils/FirebaseInterface';

@Options({
  name: 'TableAdmin',
  props: {},
  components: {},
})

export default class TableAdmin extends Vue {
db = getFirestore();

  pendings: Pending[] | undefined = [];

  async mounted() {
    const vaiavl = await getAllPending();
    this.pendings = vaiavl;
  }
  // ***********************************************************************************************
  // PROPS
  // -----------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------

  // ***********************************************************************************************
  // VARIABLES
  // -----------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------

  // ***********************************************************************************************
  // FONCTIONS
  // -----------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------
}
</script>

<style lang="scss" scoped>
// ***********************************************************************************************
// KEYFRAMES
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

// ***********************************************************************************************
// TAGS
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

// ***********************************************************************************************
// CLASSES
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
.tableadmin{
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
}

.tableadmin__table{
  table-layout: auto;
  width: 80%;
}

.tableadmin__th{
  border: 1px solid #ddd;
  padding: 12px 8px;
  background-color: #043baa;
  color: white;
  text-align:center;
}

.tableadmin__td{
  border: 1px solid #ddd;
  padding: 8px;
}

.__false{
  background-color: #ec0a0a;
}
.__true{
  background-color: #24b42d;
}
</style>
