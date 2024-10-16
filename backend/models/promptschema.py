#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from pydantic import BaseModel


class PromptSchema(BaseModel):
    prompt: str

    def __len__(self) -> int:
        return len(self.prompt)

    def __repr__(self) -> str:
        return f"Promt < {self.prompt} >"
