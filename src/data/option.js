const option = {
  title: {
    text: 'graphTitle',
    top: 'top',
    left: 'center'
  },
  tooltip: {},
  legend: [],
  animation: false,
  series: [{
    type: 'graph',
    layout: 'force',
    data: [{
      name: 'A',
      value: [
        '教授',
        '在职',
        '党委办公室、校长办公室'
      ],
      category: '中心教师',
      symbolSize: 50,
      tooltip: {
        formatter: '{b0}:{c0}'
      }
    },
    {
      name: 'B',
      category: '论文',
      value: [
        '期刊论文',
        '2005'
      ],
      symbolSize: 20,
      tooltip: {
        formatter: '{b0}:{c0}'
      }
    }],
    links: [{
      source: 'A',
      target: 'B'
    }],
    categories: [{
      name: '中心教师',
      itemStyle: {
        color: '#c23531'
      }
    },
    {
      name: '专著专利合作教师',
      itemStyle: {
        color: '#749f83'
      }
    },
    {
      name: '课程合作教师',
      itemStyle: {
        color: '#6e7074'
      }
    },
    {
      name: '论文合作教师',
      itemStyle: {
        color: '#2f4554'
      }
    },
    {
      name: '论文',
      itemStyle: {
        color: '#61a0a8'
      }
    },
    {
      name: '专著专利',
      itemStyle: {
        color: '#91c7ae'
      }
    },
    {
      name: '课程',
      itemStyle: {
        color: '#999ea4'
      }
    },
    {
      name: '项目合作教师',
      itemStyle: {
        color: '#DEB887'
      }
    },
    {
      name: '项目',
      itemStyle: {
        color: '#bda29a'
      }
    }
    ],
    roam: true,
    focusNodeAdjacency: false,
    itemStyle: {
      normal: {
        borderColor: '#fff',
        borderWidth: 1,
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.3)'
      }
    },
    label: {
      position: 'right',
      formatter: '{b}'
    },
    lineStyle: {
      color: 'target',
      opacity: 0.6,
      curveness: 0.3
    },
    emphasis: {
      lineStyle: {
        width: 10
      }
    },
    force: {
      layoutAnimation: false,
      repulsion: 500
    }
  }]
}

export default option
