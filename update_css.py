import re

with open('src/app/globals.css', 'r') as f:
    css = f.read()

# 1. :focus-visible
css = css.replace(
    '  outline: 2px solid var(--foreground);',
    '  outline: 2px solid var(--accent);'
)

# 2. Form outline
css = css.replace(
    '  outline: 2px solid #171717;',
    '  outline: 2px solid var(--accent);'
)

# 3. Breadcrumbs and topics hover
css = css.replace(
    '  color: var(--foreground);\n  text-decoration: underline;\n  text-underline-offset: 0.25rem;\n}',
    '  color: var(--accent);\n  text-decoration: underline;\n  text-underline-offset: 0.25rem;\n}'
)

# 4. ::selection
selection_css = """
::selection {
  background: var(--accent);
  color: #fff;
}
"""
if '::selection' not in css:
    css = css.replace('body {\n', selection_css + '\nbody {\n')

# 5. Logo wordmark home
css = css.replace(
    '.wordmark {\n  font-family: Arial, Helvetica, sans-serif;',
    '.wordmark {\n  font-family: Arial, Helvetica, sans-serif;\n  transition: color 0.2s;\n}\n.wordmark:hover {\n  color: var(--accent);\n}'
)

# 6. Intro kicker
css = css.replace(
    '.intro-kicker {\n  max-width: 10rem;\n  margin: 0 0 2rem 0;\n  color: var(--muted);',
    '.intro-kicker {\n  max-width: 10rem;\n  margin: 0 0 2rem 0;\n  color: var(--accent);'
)

with open('src/app/globals.css', 'w') as f:
    f.write(css)
