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
        expect(arbol.isRoot()).to.not.be.ok()
      })

      it('should return true if it is a root node', function () {
        expect(arbol).isRoot()
      })
    })

    describe('#isLeave()', function () {
      it('should return true if it has no children', function () {
        expect(false).to.be.ok()
      })

      it('should return false if it has children', function () {
        expect(false).to.be.ok()
      })
    })

    describe('#setNode()', function () {
      it('should set the node content', function () {
        expect(false).to.be.ok()
      })

      it('should throw error if node is set to null', function () {
        expect(false).to.be.ok()
      })

      it('should throw error if node is set to undefined', function () {
        expect(false).to.be.ok()
      })
    })

    describe('#getNode()', function () {
      it('should return null if node has not been set', function () {
        expect(false).to.be.ok()
      })

      it('should return node contents', function () {
        expect(false).to.be.ok()
      })
    })

    describe('#setParent()', function () {
      it('should return node having as a parent the passed node', function () {
        expect(false).to.be.ok()
      })
    })

    describe('#hasNextSibling()', function () {
      it('should return true if node has a sibiling on his right side', function () {
        expect(false).to.be.ok()
      })

      it('should return false if node does not have a sibiling on his right side', function () {
        expect(false).to.be.ok()
      })
    })

    describe('#hasPrevSibling()', function () {
      it('should return true if node has a sibiling on his left side', function () {
        expect(false).to.be.ok()
      })

      it('should return false if node does not have a sibiling on his left side', function () {
        expect(false).to.be.ok()
      })
    })

    describe('#getNextSibling()', function () {
      it('should return null if node does not have a right sibling', function () {
        expect(false).to.be.ok()
      })

      it('should return right sibling of the node', function () {
        expect(false).to.be.ok()
      })
    })

    describe('#getPrevSibling()', function () {
      it('should return null if node does not have a left sibling', function () {
        expect(false).to.be.ok()
      })

      it('should return left sibling of the node', function () {
        expect(false).to.be.ok()
      })
    })

    describe('#addSibling()', function () {
      it('should throw Exception if passed node is null', function () {
        expect(false).to.be.ok()
      })

      it('should throw Exception if passed node is undefined', function () {
        expect(false).to.be.ok()
      })

      it('should add sibling when passed node is type of Arboleda', function () {
        expect(false).to.be.ok()
      })
    })

    describe('#addChild()', function () {
      it('should throw Exception if passed node is null', function () {
        expect(false).to.be.ok()
      })

      it('should throw Exception if passed node is undefined', function () {
        expect(false).to.be.ok()
      })

      it('should add child when passed node is type of Arboleda', function () {
        expect(false).to.be.ok()
      })
    })
  })
})
