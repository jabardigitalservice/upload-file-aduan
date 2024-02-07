import useVuelidate from "@vuelidate/core"
export function hasObjectKey(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key)
}

export default function (rules, fields) {
    const validator = useVuelidate(rules, fields)
    const violations = reactive({fields: null})

    return {
        validator: validator.value,
        setViolations: fields => violations.fields = fields,
        getError: field => {
            if (hasObjectKey(violations.fields || {}, field)) {
                return violations.fields[field]
            }

            const messages = []
            const path = validator.value[field] || null
            for(const error of path?.$errors || []) {
                messages.push(error.$message)
            }

            return messages
        },
        reset: ()=> {
            violations.fields = null
            validator.value.$reset()
        }
    }
}