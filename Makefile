.PHONY: test cobol run clean

test:
	npm test

cobol:
	mkdir -p bin
	cobc -x -free src/brainrot_llm.cob -o bin/brainrot-llm

run: cobol
	./bin/brainrot-llm

clean:
	rm -rf bin
