'use strict';

var React = require('react'),
    ItemTypes = require('./ItemTypes'),
    getEmptyImage = require('./getEmptyImage'),
    Box = require('./Box'),
    { PropTypes } = React,
    { DragDropMixin, DropEffects } = require('react-dnd');

var styles = {
  draggableBox: (props) => {
    var { left, top } = props,
        transform = `translate(${left}px, ${top}px)`;

    return {
      position: 'absolute',
      webkitTransform: transform,
      transform: transform
    };
  }
};

var DraggableBox = React.createClass({
  mixins: [DragDropMixin],

  propTypes: {
    id: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
  },

  statics: {
    configureDragDrop(registerType) {
      registerType(ItemTypes.BOX, {
        dragSource: {
          beginDrag(component, e) {
            return {
              effectAllowed: DropEffects.MOVE,
              dragPreview: getEmptyImage(),
              item: component.props
            };
          }
        }
      });
    }
  },

  render() {
    var { title } = this.props;
    var { isDragging } = this.getDragState(ItemTypes.BOX);

    if (isDragging) {
      return null;
    }

    return (
      <div {...this.dragSourceFor(ItemTypes.BOX)}
           style={styles.draggableBox(this.props)}>
        <Box title={title} />
      </div>
    );
  }
});

module.exports = DraggableBox;
