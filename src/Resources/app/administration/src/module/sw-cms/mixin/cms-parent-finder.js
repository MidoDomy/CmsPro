const { Mixin } = Shopware;

Mixin.register('cms-parent-finder', {
    methods: {
        findParent: function (wantedComponentTag, component) {
            /** Abort, if the component is not a object */
            if ('object' !== typeof component) {
                return null;
            }

            /** Abort, if the parentComponent is not a object */
            if (null === component.$parent || 'object' !== typeof component.$parent) {
                return null;
            }

            /** Check the parent of the parent, if the wanted tag name does not match */
            if (wantedComponentTag !== component.$parent.$options._componentTag) {
                return this.findParent(wantedComponentTag, component.$parent);
            }

            /** Otherwise we return the object */
            return component.$parent;
        }
    }
});
