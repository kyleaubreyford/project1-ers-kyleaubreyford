package com.revature.models;

public class Type {
	private int typeId;

	public Type(int typeId) {
		super();
		this.typeId = typeId;
	}

	public Type() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getTypeId() {
		return typeId;
	}

	public void setTypeId(int typeId) {
		this.typeId = typeId;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + typeId;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Type other = (Type) obj;
		if (typeId != other.typeId)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Type [typeId=" + typeId + "]";
	}
	
	
}
