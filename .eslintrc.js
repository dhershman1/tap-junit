module.exports = {
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 6,
		'sourceType': 'module'
	},
	'rules': {

		/* Possible Errors */
		'getter-return': ['error'],
		'no-extra-parens': ['error', 'functions'],
		'no-prototype-builtins': ['error'],
		'no-template-curly-in-string': ['error'],

		/* Best Practices */
		'accessor-pairs': ['error'],
		'array-callback-return': ['error'],
		'block-scoped-var': ['error'],
		'class-methods-use-this': ['error'],
		'complexity': ['error', 3],
		'consistent-return': ['error'],
		'curly': ['error', 'multi-line'],
		'default-case': ['error'],
		'dot-notation': ['error'],
		'eqeqeq': ['error', 'always'],
		'no-caller': ['error'],
		'no-console': ['error', {allow: ['error', 'warn']}],
		'no-else-return': ['error'],
		'no-empty-function': ['error'],
		'no-eval': ['error'],
		'no-implicit-coercion': ['error'],
		'no-implicit-globals': ['error'],
		'no-invalid-this': ['error'],
		'no-iterator': ['error'],
		'no-lone-blocks': ['error'],
		'no-loop-func': ['error'],
		'no-multi-spaces': ['error'],
		'no-multi-str': ['error'],
		'no-new': ['error'],
		'no-new-func': ['error'],
		'no-new-wrappers': ['error'],
		'no-param-reassign': ['error'],
		'no-proto': ['error'],
		'no-return-await': ['error'],
		'no-self-compare': ['error'],
		'no-unused-expressions': ['error'],
		'no-useless-call': ['error'],
		'no-useless-return': ['error'],
		'no-with': ['error'],
		'prefer-promise-reject-errors': ['error'],
		'require-await': ['error'],
		'vars-on-top': ['error'],
		'yoda': ['error'],

		/* Variables */
		'no-catch-shadow': ['error'],
		'no-shadow': ['error'],
		'no-shadow-restricted-names': ['error'],
		'no-undef-init': ['error'],
		'no-undefined': ['error'],
		'no-use-before-define': ['error'],

		/* Node.js and CommonJS */
		'global-require': ['error'],
		'handle-callback-err': ['error'],
		'no-mixed-requires': ['error'],
		'no-new-require': ['error'],
		'no-path-concat': ['error'],

		/* ECMAScript 6 (2015+) */
		'arrow-body-style': ['error'],
		'arrow-parens': ['error', 'as-needed'],
		'arrow-spacing': ['error'],
		'generator-star-spacing': ['error', {
			'before': false,
			'after': true
		}],
		'no-confusing-arrow': ['error'],
		'no-duplicate-imports': ['error'],
		'no-useless-constructor': ['error'],
		'no-useless-rename': ['error'],
		'no-var': ['error'],
		'object-shorthand': ['error'],
		'prefer-arrow-callback': ['error'],
		'prefer-const': ['error'],
		'prefer-destructuring': ['error'],
		'prefer-rest-params': ['error'],
		'prefer-spread': ['error'],
		'prefer-template': ['error'],
		'rest-spread-spacing': ['error'],
		'sort-imports': ['error'],
		'template-curly-spacing': ['error'],
		'yield-star-spacing': ['error', {
			'before': false,
			'after': true
		}],

		/* Stylistic Issues */
		'array-bracket-spacing': ['error'],
		'block-spacing': ['error'],
		'brace-style': ['error', '1tbs'],
		'camelcase': ['error'],
		'capitalized-comments': ['warn'],
		'comma-dangle': ['error'],
		'comma-spacing': ['error'],
		'comma-style': ['error'],
		'computed-property-spacing': ['error'],
		'consistent-this': ['error'],
		'eol-last': ['warn'],
		'func-call-spacing': ['error'],
		'func-name-matching': ['error'],
		'func-names': ['error'],
		'func-style': ['error'],
		'indent': ['error', 'tab', {
			'SwitchCase': 1
		}],
		'key-spacing': ['error'],
		'keyword-spacing': ['error', {
			'before': true,
			'after': true
		}],
		'line-comment-position': ['error'],
		'lines-around-comment': ['error'],
		'max-len': ['error', {
			'tabWidth': 1,
			'code': 120
		}],
		'max-params': ['error', {
			'max': 3
		}],
		'multiline-ternary': ['error', 'never'],
		'new-cap': ['error'],
		'new-parens': ['error'],
		'newline-after-var': ['error'],
		'newline-before-return': ['error'],
		'no-array-constructor': ['error'],
		'no-bitwise': ['error'],
		'no-inline-comments': ['error'],
		'no-lonely-if': ['error'],
		'no-mixed-operators': ['error'],
		'no-mixed-spaces-and-tabs': ['error'],
		'no-multi-assign': ['error'],
		'no-multiple-empty-lines': ['error'],
		'no-nested-ternary': ['error'],
		'no-new-object': ['error'],
		'no-restricted-syntax': ['error'],
		'no-trailing-spaces': ['error'],
		'no-underscore-dangle': ['error'],
		'no-unneeded-ternary': ['error'],
		'no-whitespace-before-property': ['error'],
		'object-property-newline': ['error'],
		'one-var-declaration-per-line': ['error'],
		'quote-props': ['error', 'consistent'],
		'quotes': ['error', 'single', {
			'allowTemplateLiterals': true
		}],
		'semi-spacing': ['error'],
		'semi': ['error'],
		'space-before-blocks': ['error'],
		'space-before-function-paren': ['error', 'never'],
		'space-in-parens': ['error'],
		'space-infix-ops': ['error'],
		'spaced-comment': ['error'],
		'wrap-regex': ['error']
	},
	'env': {
		'node': true,
		'es6': true,
		'browser': true
	}
};
