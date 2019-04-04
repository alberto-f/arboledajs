
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
    if(content == null || content == undefined) {
      throw new Error('#setNode parameter: Expect non-null nor undefined parameter')
    }

    this._content = content
    return this
  }

  getNode () {
    return this._content
  }

  addChild(arboledaInstance) {
    if(arboledaInstance instanceof Arboleda) {
      this._children.push(arboledaInstance);
      
      arboledaInstance.setParent(this)

      return this
    }

    throw new Error('#addChild parameter: Expect non-null arboledaInstance')
  }

  hasNextSibling(){
    if(!this.getParent()) {
      return false      
    }

    const children = this.getParent().getChildren()
    if(children.length == 0) {
      return false
    }

    const index = children.indexOf(this)

    // Check if it is the last child
    return (index !== children.length-1)
  }

  getNextSibling(){
    if(!this.getParent()) {
      return null      
    }

    const children = this.getParent().getChildren()
    if(children.length == 0) {
      return null
    }

    let index = children.indexOf(this)

    // Check if it is the last child
    if(index == children.length-1) {
      return null
    }

    return children[index+1]
  }

  setParent (parentNode) {
    if (!(parentNode instanceof Arboleda)) {
      throw new Error('Parent MUST BE instance of Arboleda')
    }

    if(!parentNode.getChildren().includes(this)) {
      parentNode.addChild(this);
    }

    this._parent = parentNode
  }
}
