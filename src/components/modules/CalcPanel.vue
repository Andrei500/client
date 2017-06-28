<script>
computed: {

  total() {
    if (this.sums.length) {
      return this.sums.reduce((prev, cur) => {
        return prev + cur.value;
      }, 0);
    } else return 0;
  }
},
methods: {

  addSum(sum) {
    const index = this.sums.findIndex(item => item.name === sum.name);
    (index === -1) ? this.sums.push(sum): this.sums[index].value = sum.value;
  },
  delSum(sum) {
    const index = this.sums.findIndex(item => item.name === sum.name);
    if (index !== -1) this.sums.splice(index, 1);
  },
  trans() {
    const
      weight = this.calcMaxWeight(this.load),
      trans = {
        name: 'Транспортировка',
        value: 0
      },
      curFrom = {
        name: 'Забор с адреса',
        value: 0
      },
      curTo = {
        name: 'Доставка на адрес',
        value: 0
      };
  },

  },
  pack() {
    const pack = {
      name: this.services.pack.name,
      value: 100
    };
    if (this.services.pack.value) this.addSum(pack);
    else this.delSum(pack);
  }
}
</script>
