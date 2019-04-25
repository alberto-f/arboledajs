
module.exports = class Arboleda {
  constructor (content) {
    this._parent = undefined
    this._content = (content !== null || content == null) ? content : undefined
    this._children = []
  }

  getParent () {
    return this._parent
  }

  getChildren () {
    return this._children
  }

  isRoot () {
    return this.getParent() === undefined
  }

  isLeaf () {
    return this.getChildren().length === 0
  }

  setNode (content) {
    this._content = content
  }

  getNode () {
    return this._content
  }

  addChild (arboledaInstance) {
    if (arboledaInstance instanceof Arboleda) {
      this._children.push(arboledaInstance)

      arboledaInstance.setParent(this)
    } else {
      throw new Error('#addChild parameter: Expect non-null arboledaInstance')
    }
  }

  addSibling (arboledaInstance) {
    if (arboledaInstance instanceof Arboleda && !this.isRoot()) {
      this.getParent().addChild(arboledaInstance)

      arboledaInstance.setParent(this.getParent())
    } else {
      throw new Error('#addSibling: Unexpected value received')
    }
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

  // TODO: It should be a query to check againts node's content
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
