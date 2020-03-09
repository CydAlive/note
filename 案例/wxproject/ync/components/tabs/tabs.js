Component({
  data: {},
  properties: {
    tabs:{
      type: Array,
      value: []
    }
  },
  methods: {
    clickItem(e){
      let {index} = e.currentTarget.dataset
      console.log(index);
      this.triggerEvent('cmpClickItem',{index})
    }
  }
})