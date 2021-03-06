/**
Copyright (c) 2016 The Chromium Authors. All rights reserved.
Use of this source code is governed by a BSD-style license that can be
found in the LICENSE file.
**/

require("./blame_context.js");

'use strict';

/**
 * @fileoverview Trace Viewer side's correspondence of Chrome's
 * content::FrameBlameContext class.
 *
 */
global.tr.exportTo('tr.e.chrome', function() {
  var BlameContextSnapshot = tr.e.chrome.BlameContextSnapshot;
  var BlameContextInstance = tr.e.chrome.BlameContextInstance;

  function RenderFrameSnapshot() {
    BlameContextSnapshot.apply(this, arguments);
  }

  RenderFrameSnapshot.prototype = {
    __proto__: BlameContextSnapshot.prototype,

    referencedAt: function(item, object, field) {
      if (item instanceof tr.e.chrome.FrameTreeNodeSnapshot &&
          object === item.args &&
          field === 'renderFrame') {
        this.args.frameTreeNode = item;
      }
    },

    get frameTreeNode() {
      if (this.args.frameTreeNode instanceof tr.e.chrome.FrameTreeNodeSnapshot)
        return this.args.frameTreeNode;
      return undefined;
    },

    get url() {
      if (this.frameTreeNode)
        return this.frameTreeNode.url;
      return undefined;
    },

    get userFriendlyName() {
      return 'RenderFrame';
    }
  };

  tr.model.ObjectSnapshot.register(
      RenderFrameSnapshot,
      {typeName: 'RenderFrame'});

  function RenderFrameInstance() {
    BlameContextInstance.apply(this, arguments);
  }

  RenderFrameInstance.prototype = {
    __proto__: BlameContextInstance.prototype,

    get blameContextType() {
      return 'Frame';
    }
  };

  tr.model.ObjectInstance.register(
      RenderFrameInstance,
      {typeName: 'RenderFrame'});

  return {
    RenderFrameSnapshot: RenderFrameSnapshot,
    RenderFrameInstance: RenderFrameInstance
  };
});
