export const conf = {
	plugins:
		'preview searchreplace autolink autosave directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking insertdatetime advlist lists wordcount help charmap quickbars emoticons',
	toolbar:
		'restoredraft undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview print | image media link codesample',
	toolbar_sticky: true,
	image_caption: true,
	autosave_ask_before_unload: true,
	autosave_interval: '30s',
	autosave_prefix: 'tinymce-autosave-{path}{query}-{id}-',
	autosave_restore_when_empty: false,
	autosave_retention: '2m',
	quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
	placeholder: 'post content here...'
};
