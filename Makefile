default:
	rm -f toptal-referral-urls.zip
	zip -r toptal-referral-urls.zip -x.git* -x.idea/* -xMakefile -xscreenshots/* -xicons/*.xcf .