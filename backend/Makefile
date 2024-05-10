-include .env

.PHONY: deploy help 

help:
	@echo "Usage:"
	@echo "  make deploy [ARGS=...]\n    example: make deploy -> to deploy on localhost\n 	     make deploy ARGS=\"sepolia\" -> to deploy on sepolia "
	@echo ""

NETWORK_ARGS := --rpc-url http://localhost:8545 --private-key $(PRIVATE_KEY_WALLET_ANVIL) --broadcast


ifeq ($(findstring sepolia, $(ARGS)), sepolia)
	NETWORK_ARGS := --rpc-url https://eth-sepolia.g.alchemy.com/v2/$(ALCHEMY_SEPOLIA_KEY) --private-key $(PRIVATE_KEY_WALLET_PROD) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) -vvvv
endif

deploy:
	@forge script script/SimpleStorage.s.sol:SimpleStorageDeploy $(NETWORK_ARGS)

deployCopy:
	$(MAKE) deploy
	@node script/copyFile.js $(ARGS)