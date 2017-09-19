exports.stubComponent = {
  create: (name) => { return { name, render: h => h('div') } },
}
