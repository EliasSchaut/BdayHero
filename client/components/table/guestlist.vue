<template>
  <Table>
    <TableHeader>
      <TableRow
        v-for="headerGroup in table.getHeaderGroups()"
        :key="headerGroup.id"
      >
        <TableHead
          v-for="header in headerGroup.headers"
          :key="header.id"
          :colSpan="header.colSpan"
        >
          <FlexRender
            v-if="!header.isPlaceholder"
            class="flex flex-row items-center"
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <template v-if="table.getRowModel().rows?.length">
        <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
          <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </TableCell>
        </TableRow>
      </template>
      <template v-else>
        <TableRow>
          <TableCell :colSpan="columns.length" class="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      </template>
    </TableBody>
  </Table>
</template>

<script setup lang="ts">
import { ArrowsUpDownIcon } from '@heroicons/vue/16/solid';
import {
  useVueTable,
  createColumnHelper,
  FlexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
} from '@tanstack/vue-table';

type Guest = {
  first_name: string;
  last_name: string;
};

const query_guests = gql`
  query {
    users_public {
      first_name
      last_name
    }
  }
`;
const { result: result_guests } = useQuery(query_guests, null, {
  prefetch: true,
});

const columnHelper = createColumnHelper<Guest>();
const sorting = ref<SortingState>([
  {
    id: 'first_name',
    desc: false,
  },
]);

const columns = [
  columnHelper.accessor('first_name', {
    header: ({ column }) => {
      return h(
        'button',
        {
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        ['First Name', h(ArrowsUpDownIcon, { class: 'ml-2 h-4 w-4' })],
      );
    },
    cell: (props) => props.getValue(),
    sortingFn: 'alphanumeric',
  }),
  columnHelper.accessor('last_name', {
    header: ({ column }) => {
      return h(
        'button',
        {
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        ['Last Name', h(ArrowsUpDownIcon, { class: 'ml-2 h-4 w-4' })],
      );
    },
    cell: (props) => props.getValue(),
    sortingFn: 'alphanumeric',
  }),
];

const table = useVueTable({
  get data() {
    return result_guests?.value?.users_public ?? [];
  },
  get columns() {
    return columns;
  },
  state: {
    get sorting() {
      return sorting.value;
    },
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  enableSorting: true,
  onSortingChange: (updaterOrValue) => value_updater(updaterOrValue, sorting),
});
</script>
