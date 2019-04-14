
module.exports = class Arboleda {
  constructor (content = null) {
    this._parent = null
    this._content = content
    this._children = []
  }

  getParent () {
    return this._parent
  }

  getChildren () {
    return this._children
  }

  isRoot () {
    return this.getNode() !== null && this.getParent() === null
  }

  isLeave () {
    return this.getNode() && this.getChildren().length === 0
  }

  setNode (content) {
    if (content === null || content === undefined) {
      throw new Error('#setNode parameter: Expect non-null nor undefined parameter')
    }

    this._content = content
    return this
  }

  getNode () {
    return this._content
  }

  addChild (arboledaInstance) {
    if (arboledaInstance instanceof Arboleda) {
      this._children.push(arboledaInstance)

      arboledaInstance.setParent(this)

      return this
    }

    throw new Error('#addChild parameter: Expect non-null arboledaInstance')
  }

  addSibling (arboledaInstance) {
    if (arboledaInstance instanceof Arboleda && !this.isRoot()) {
      this.getParent().addChild(arboledaInstance)

      arboledaInstance.setParent(this.getParent())

      return this
    }

    throw new Error('#addSibling: Unexpected value received')
  }

  hasNextSibling () {
    if (!this.getParent()) {
      return false
    }

    const children = this.getParent().getChildren()
    if (children.length === 0) {
      return false
    }

    const index = children.indexOf(this)

    // Check if it is the last child
    return (index !== children.length - 1)
  }

  getNextSibling () {
    if (!this.getParent()) {
      return null
    }

    const children = this.getParent().getChildren()
    if (children.length === 0) {
      return null
    }

    let index = children.indexOf(this)

    // Check if it is the last child
    if (index === children.length - 1) {
      return null
    }

    return children[index + 1]
  }

  setParent (parentNode) {
    if (!(parentNode instanceof Arboleda)) {
      throw new Error('Parent MUST BE instance of Arboleda')
    }

    if (!parentNode.getChildren().includes(this)) {
      parentNode.addChild(this)
    }

    this._parent = parentNode
  }

  pathTo (arboledaInstance) {
    if (arboledaInstance instanceof Arboleda) {
      return this._pathTo(arboledaInstance)
    }

    throw new Error('#pathTo: Unexpected value received')
  }

  _pathTo (arboledaInstance) {
    let pathTo = []
    if (this === arboledaInstance) {
      pathTo.push(this)
    } else if (this.getChildren().length > 0) {
      const children = this.getChildren()

      for (let i = 0, j = children.length - 1; i <= j; i++) {
        const child = children[i]
        const path = child._pathTo(arboledaInstance)
        if (path.length > 0) {
          pathTo = [this].concat(path)
        }
      }
    }

    return pathTo
  }
}
