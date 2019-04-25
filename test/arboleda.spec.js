/* globals it, describe */
const expect = require('expect.js')
const Arboleda = require('../index')

describe('Arboleda', function () {
  describe('Structure specs', function () {
    describe('#constructor()', function () {
      it('should return an instance of Arboleda', function () {
        const arbol = new Arboleda()
        expect(arbol).to.be.a(Arboleda)
      })

      it('should return an instance of Arboleda with the content set', function () {
        let arbol = new Arboleda(null)
        expect(arbol.getNode()).to.equal(null)

        arbol = new Arboleda(undefined)
        expect(arbol.getNode()).to.equal(undefined)

        let content = {}
        arbol = new Arboleda(content)
        expect(arbol.getNode()).to.equal(content)
      })
    })

    describe('#isRoot()', function () {
      it('should return true if it is a solo node', function () {
        const arbol = new Arboleda()
        expect(arbol.isRoot()).to.be.ok()
      })

      it('should return false if it is not a root node', function () {
        const arbol = new Arboleda()
        const rootArbol = new Arboleda()
        rootArbol.addChild(arbol)
        expect(arbol.isRoot()).to.not.be.ok()
      })

      it('should return true if it is a root node', function () {
        const arbol = new Arboleda()
        const rootArbol = new Arboleda()
        rootArbol.addChild(arbol)
        expect(rootArbol.isRoot()).to.be.ok()
      })
    })

    describe('#isLeaf()', function () {
      it('should return false if it has children', function () {
        const rootArbol = new Arboleda()
        const leafArbol = new Arboleda()

        rootArbol.addChild(leafArbol)

        expect(rootArbol.isLeaf()).to.not.be.ok()
      })

      it('should return true if it has no children', function () {
        const rootArbol = new Arboleda()
        const leafArbol = new Arboleda()

        rootArbol.addChild(leafArbol)

        expect(leafArbol.isLeaf()).to.be.ok()
      })
    })

    describe('#setNode()', function () {
      it('should not throw error if node is set to null', function () {
        const rootArbol = new Arboleda()
        const fn = (content) => rootArbol.setNode(content)
        expect(fn).withArgs(null).to.not.throwException()
      })

      it('should not throw error if node is set to undefined', function () {
        const rootArbol = new Arboleda()
        const fn = (content) => rootArbol.setNode(content)
        expect(fn).withArgs(undefined).to.not.throwException()
      })

      it('should set the node content', function () {
        const content = {}
        const rootArbol = new Arboleda()

        rootArbol.setNode(null)
        expect(rootArbol.getNode()).to.equal(null)

        rootArbol.setNode(content)
        expect(rootArbol.getNode()).to.equal(content)
      })
    })

    describe('#getNode()', function () {
      it('should return undefined if node has not been set', function () {
        const rootArbol = new Arboleda()
        expect(rootArbol.getNode()).to.be.equal(undefined)
      })

      it('should return node contents', function () {
        const content = {}
        const rootArbol = new Arboleda()
        rootArbol.setNode(content)
        expect(rootArbol.getNode()).to.equal(content)
      })
    })

    describe('#setParent()', function () {
      it('should return throw if non-arboleda instance is passed as parent node', function () {
        const rootArbol = new Arboleda({})

        expect(rootArbol.setParent).withArgs().to.throwException()
        expect(rootArbol.setParent).withArgs(null).to.throwException()
        expect(rootArbol.setParent).withArgs('hello').to.throwException()
        expect(rootArbol.setParent).withArgs({}).to.throwException()
      })

      it('should set the specified node as parent of the node', function () {
        const parentArbol = new Arboleda({})
        const childArbol = new Arboleda({})

        childArbol.setParent(parentArbol)
        expect(childArbol.getParent()).to.equal(parentArbol)
        expect(parentArbol.getChildren()).to.contain(childArbol)
        expect(parentArbol.getChildren().length).to.be(1)
      })
    })

    describe('#hasNextSibling()', function () {
      it('should return true if node has a sibling on his right side', function () {
        const parentArbol = new Arboleda({})
        const childA = new Arboleda({})
        const childB = new Arboleda({})

        parentArbol.addChild(childA)
        parentArbol.addChild(childB)

        expect(childA.hasNextSibling()).to.be.ok()
      })

      it('should return false if node does not have a sibling on his right side', function () {
        const parentArbol = new Arboleda({})
        expect(parentArbol.hasNextSibling()).to.not.be.ok()

        const childA = new Arboleda({})
        const childB = new Arboleda({})

        parentArbol.addChild(childA)
        parentArbol.addChild(childB)

        expect(childB.hasNextSibling()).to.not.be.ok()
      })
    })

    describe('#getNextSibling()', function () {
      it('should return null if node does not have a right sibling', function () {
        const parentArbol = new Arboleda({})
        expect(parentArbol.getNextSibling()).to.be(null)

        const childA = new Arboleda({})
        const childB = new Arboleda({})

        parentArbol.addChild(childA)
        parentArbol.addChild(childB)

        expect(childB.getNextSibling()).to.be(null)
      })

      it('should return right sibling of the node', function () {
        const parentArbol = new Arboleda({})
        const childA = new Arboleda({})
        const childB = new Arboleda({})

        parentArbol.addChild(childA)
        parentArbol.addChild(childB)

        expect(childA.getNextSibling()).to.equal(childB)
      })
    })

    describe('#addSibling()', function () {
      it('should throw Exception if call is done on node without parent', function () {
        const parentArbol = new Arboleda({})
        const childA = new Arboleda({})

        // parentArbol cannot have a sibling since parentArbol is rootNode.
        expect(parentArbol.addSibling).withArgs(childA).to.throwException()
      })

      it('should throw Exception if call passing a not instance of arboleda', function () {
        const parentArbol = new Arboleda({})
        const childA = new Arboleda({})

        expect(childA.addSibling).withArgs().to.throwException()
        expect(childA.addSibling).withArgs(null).to.throwException()
        expect(parentArbol.addSibling).withArgs({}).to.throwException()
      })

      it('should add sibling when passed node is instance of Arboleda', function () {
        const parentArbol = new Arboleda({})
        const childA = new Arboleda({})
        const childB = new Arboleda({})

        parentArbol.addChild(childA)
        childA.addSibling(childB)

        // expect(childA.getParent()).to.be(childB.getParent())
        // expect(parentArbol.getChildren()).to.contain(childA)
        // expect(parentArbol.getChildren()).to.contain(childB)
        // expect(parentArbol.getChildren().length).to.be(2)
      })
    })

    describe('#addChild()', function () {
      it('should throw Exception if passed node is not an arboleda instance', function () {
        const parentArbol = new Arboleda({})

        expect(parentArbol.addChild).withArgs(null).to.throwException()
        expect(parentArbol.addChild).withArgs().to.throwException()
        expect(parentArbol.addChild).withArgs({}).to.throwException()
      })

      it('should add child when passed node is instance of Arboleda', function () {
        const parentArbol = new Arboleda({})
        const childA = new Arboleda({})

        parentArbol.addChild(childA)

        expect(childA.getParent()).to.be(parentArbol)
        expect(parentArbol.getChildren()).to.contain(childA)
      })
    })
  })

  // describe('#pathTo()', function () {
  //   it('should return empty array [] if there is no path from node A to node B', function () {
  //     const arbol = new Arboleda({})
  //     const child = new Arboleda({})

  //     const path = arbol.pathTo(child)

  //     expect(path).to.be.empty()
  //     expect(path.length).to.be(0)
  //   })

  //   it('should return an array [] with a node to iself', function () {
  //     const arbol = new Arboleda({})
  //     const child = new Arboleda({})
  //     arbol.addChild(child)

  //     const pathToItself = arbol.pathTo(arbol)
  //     expect(pathToItself.length).to.be(1)
  //     expect(pathToItself).to.contain(arbol)
  //   })

  //   it('should return an array with nodes to traverse to get from NodeA to NodeB', function () {
  //     const arbol = new Arboleda({})
  //     const childA = new Arboleda({})
  //     const childAA = new Arboleda({})
  //     const childAAA = new Arboleda({})
  //     const childB = new Arboleda({})

  //     arbol.addChild(childA)
  //     arbol.addChild(childB)

  //     childA.addChild(childAA)
  //     childAA.addChild(childAAA)

  //     // Path to itself
  //     const pathToItself = arbol.pathTo(arbol)
  //     expect(pathToItself.length).to.be(1)
  //     expect(pathToItself).to.contain(arbol)

  //     // Path to direct child
  //     const pathToDirectChild = arbol.pathTo(childA)
  //     expect(pathToDirectChild.length).to.be(2)

  //     const expectedDirectPath = [arbol, childA]
  //     expectedDirectPath.forEach(nodeInPath =>
  //       expect(pathToDirectChild).to.contain(nodeInPath)
  //     )

  //     // Path to deeper child
  //     const pathToDeeperChild = arbol.pathTo(childAAA)
  //     expect(pathToDeeperChild.length).to.be(4)

  //     const expectedDeeperPath = [arbol, childA, childAA, childAAA]
  //     expectedDeeperPath.forEach(nodeInPath =>
  //       expect(pathToDeeperChild).to.contain(nodeInPath)
  //     )
  //   })
  // })
})
