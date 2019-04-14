/* globals it, describe, beforeEach */
const expect = require('expect.js')

const Arboleda = require('../index')

let arbol = null

describe('Arboleda', function () {
  describe('Structure specs', function () {
    beforeEach(() => {
      arbol = new Arboleda()
    })

    describe('#constructor()', function () {
      it('should return an instance of Arboleda', function () {
        expect(arbol).to.be.a(Arboleda)
      })
    })

    describe('#isRoot()', function () {
      it('should return false if it has no node data', function () {
        expect(arbol.isRoot()).to.not.be.ok()
      })

      it('should return false if it is not a root node', function () {
        const rootArbol = new Arboleda()
        rootArbol.setNode({}).addChild(arbol)
        expect(arbol.isRoot()).to.not.be.ok()
      })

      it('should return true if it is a root node', function () {
        const rootArbol = new Arboleda()
        rootArbol.setNode({})
        expect(rootArbol.isRoot()).to.be.ok()
      })
    })

    describe('#isLeave()', function () {
      it('should return false if it has children', function () {
        const rootArbol = new Arboleda()
        rootArbol.setNode({})

        const leafArbol = new Arboleda()
        leafArbol.setNode({})

        rootArbol.addChild(leafArbol)

        expect(rootArbol.isLeave()).to.not.be.ok()
      })

      it('should return false if it has no node data', function () {
        const rootArbol = new Arboleda()
        rootArbol.setNode({})

        const leafArbol = new Arboleda()

        rootArbol.addChild(leafArbol)

        expect(rootArbol.isLeave()).to.not.be.ok()
      })

      it('should return true if it has no children', function () {
        const rootArbol = new Arboleda()
        rootArbol.setNode({})

        const leafArbol = new Arboleda()
        leafArbol.setNode({})

        rootArbol.addChild(leafArbol)

        expect(leafArbol.isLeave()).to.be.ok()
      })
    })

    describe('#setNode()', function () {
      it('should set the node content', function () {
        const content = {}
        const rootArbol = new Arboleda()
        rootArbol.setNode(content)

        expect(rootArbol.getNode()).to.equal(content)
      })

      it('should throw error if node is set to null', function () {
        const rootArbol = new Arboleda()
        expect(rootArbol.setNode).withArgs(null).to.throwException()
      })

      it('should throw error if node is set to undefined', function () {
        const rootArbol = new Arboleda()
        expect(rootArbol.setNode).withArgs(undefined).to.throwException()
      })
    })

    describe('#getNode()', function () {
      it('should return null if node has not been set', function () {
        const rootArbol = new Arboleda()
        expect(rootArbol.getNode()).to.be.equal(null)
      })

      it('should return node contents', function () {
        const content = {}
        const rootArbol = new Arboleda(content)
        expect(rootArbol.getNode()).to.equal(content)
      })
    })

    describe('#setParent()', function () {
      it('should return throw if undefined is passed as parent node', function () {
        const rootArbol = new Arboleda({})
        expect(rootArbol.setParent).withArgs().to.throwException()
      })

      it('should return throw if null is passed as parent node', function () {
        const rootArbol = new Arboleda({})
        expect(rootArbol.setParent).withArgs(null).to.throwException()
      })

      it('should return throw if non-arboleda instance is passed as parent node', function () {
        const rootArbol = new Arboleda({})
        expect(rootArbol.setParent).withArgs('hello').to.throwException()
        expect(rootArbol.setParent).withArgs({}).to.throwException()
      })

      it('should return node having as a parent the passed node', function () {
        const parentArbol = new Arboleda({})
        const childArbol = new Arboleda({})

        childArbol.setParent(parentArbol)
        expect(childArbol.getParent()).to.equal(parentArbol)
        expect(parentArbol.getChildren()).to.contain(childArbol)
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
      it('should throw Exception if passed node is null', function () {
        const childA = new Arboleda({})

        expect(childA.addSibling).withArgs(null).to.throwException()
      })

      it('should throw Exception if passed node is undefined', function () {
        const childA = new Arboleda({})

        expect(childA.addSibling).withArgs().to.throwException()
      })

      it('should throw Exception if call if done on node without parent', function () {
        const parentArbol = new Arboleda({})
        const childA = new Arboleda({})

        expect(parentArbol.addSibling).withArgs(childA).to.throwException()
      })

      it('should throw Exception if call passing a non-arboleda instance', function () {
        const parentArbol = new Arboleda({})
        const childA = new Arboleda({})

        expect(parentArbol.addSibling).withArgs(childA).to.throwException()
      })

      it('should add sibling when passed node is type of Arboleda', function () {
        const parentArbol = new Arboleda({})
        const childA = new Arboleda({})
        const childB = new Arboleda({})

        parentArbol.addChild(childA)
        childA.addSibling(childB)

        expect(childA.getParent()).to.be(childB.getParent())
        expect(parentArbol.getChildren()).to.contain(childA)
        expect(parentArbol.getChildren()).to.contain(childB)
      })
    })

    describe('#addChild()', function () {
      it('should throw Exception if passed node is null', function () {
        const parentArbol = new Arboleda({})

        expect(parentArbol.addChild).withArgs(null).to.throwException()
      })

      it('should throw Exception if passed node is undefined', function () {
        const parentArbol = new Arboleda({})

        expect(parentArbol.addChild).withArgs().to.throwException()
      })

      it('should add child when passed node is type of Arboleda', function () {
        const parentArbol = new Arboleda({})
        const childA = new Arboleda({})

        parentArbol.addChild(childA)

        expect(childA.getParent()).to.be(parentArbol)
        expect(parentArbol.getChildren()).to.contain(childA)
      })
    })
  })

  describe('#pathTo()', function () {
    it('should return empty array [] if there is no path from node A to node B', function () {
      const arbol = new Arboleda({})
      const child = new Arboleda({})

      const path = arbol.pathTo(child)

      expect(path).to.be.empty()
      expect(path.length).to.be(0)
    })

    it('should return an array [] with a node to iself', function () {
      const arbol = new Arboleda({})
      const child = new Arboleda({})
      arbol.addChild(child)

      const pathToItself = arbol.pathTo(arbol)
      expect(pathToItself.length).to.be(1)
      expect(pathToItself).to.contain(arbol)
    })

    it('should return an array with nodes to traverse to get from NodeA to NodeB', function () {
      const arbol = new Arboleda({})
      const childA = new Arboleda({})
      const childAA = new Arboleda({})
      const childAAA = new Arboleda({})
      const childB = new Arboleda({})

      arbol.addChild(childA)
      arbol.addChild(childB)

      childA.addChild(childAA)
      childAA.addChild(childAAA)

      // Path to itself
      const pathToItself = arbol.pathTo(arbol)
      expect(pathToItself.length).to.be(1)
      expect(pathToItself).to.contain(arbol)

      // Path to direct child
      const pathToDirectChild = arbol.pathTo(childA)
      expect(pathToDirectChild.length).to.be(2)

      const expectedDirectPath = [arbol, childA]
      expectedDirectPath.forEach(nodeInPath =>
        expect(pathToDirectChild).to.contain(nodeInPath)
      )

      // Path to deeper child
      const pathToDeeperChild = arbol.pathTo(childAAA)
      expect(pathToDeeperChild.length).to.be(4)

      const expectedDeeperPath = [arbol, childA, childAA, childAAA]
      expectedDeeperPath.forEach(nodeInPath =>
        expect(pathToDeeperChild).to.contain(nodeInPath)
      )
    })
  })
})
