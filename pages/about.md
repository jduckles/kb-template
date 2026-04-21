---
layout: default
title: About
permalink: /about/
---
<div class="prose-page" markdown="1">

# About This Knowledge Base

This is a collaborative knowledge base for **{{ site.brand.org_name | default: site.title }}**.

{{ site.description }}

## Contributing

Anyone in the community can contribute articles. See the
[Writing Articles]({{ '/writing-articles/' | relative_url }}) guide to get started.

## Built With

This knowledge base uses the [KB Template](https://github.com/your-org/kb-template),
an open-source Jekyll template for community knowledge bases. MIT licensed.

## Contact

{% if site.author.email %}- Email: [{{ site.author.email }}](mailto:{{ site.author.email }}){% endif %}
{% if site.author.url %}- Website: [{{ site.author.url }}]({{ site.author.url }}){% endif %}

</div>
