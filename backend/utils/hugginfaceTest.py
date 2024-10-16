#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from transformers import AutoModelForCausalLM, AutoTokenizer


class GenerateText(object):
  _cached_gpt2_model_path = "/Users/a1/.cache/huggingface/hub/models--gpt2/snapshots/607a30d783dfa663caf39e06633721c8d4cfcd7e/"

  def __init__(self, prompt: str) -> None:
    self.promt = prompt
    self.model = AutoModelForCausalLM.from_pretrained(pretrained_model_name_or_path=self._cached_gpt2_model_path)
    self.tokenizer = AutoTokenizer.from_pretrained(pretrained_model_name_or_path=self._cached_gpt2_model_path)

  def generate_text(self) -> str:
    input_ids = self.tokenizer(self.promt, return_tensors="pt").input_ids
    generate_tokens = self.model.generate(input_ids, pad_token_id=self.tokenizer.eos_token_id, do_sample=True, temperature=0.7, max_length=100)
    gen_text = self.tokenizer.batch_decode(generate_tokens)[0]
    return gen_text